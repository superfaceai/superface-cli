import { Register, Consumer } from "superdriver";
import { readYAMLFileToJSON } from "./readYAML";
import { handle, Handler } from "./handle";
import { REGISTRY_URL } from "./serviceRegistry";

const SERVICEMAPPING_PROFILE_ID =
  "http://supermodel.io/superface/mappingstore/ServiceMapping";

/**
 * Creates new mapping or update existing mapping in the mapping store
 *
 * @param mappingFilePath Path to the YAML source of the mapping to be uploaded to the mapping store
 * @param mappingId Mapping store id to update with the source
 */
async function setMappingStore(mappingFilePath: string, mappingId?: string) {
  // Load Mapping file
  const loadMapping = await handle(readYAMLFileToJSON(mappingFilePath));
  if (!loadMapping.ok) {
    console.error(loadMapping.error);
    throw new Error("failed loading mapping file");
  }

  // Find a mapping store service
  const register = new Register(REGISTRY_URL);
  const foundServices = await handle(
    register.findServices(SERVICEMAPPING_PROFILE_ID)
  );
  if (!foundServices.ok) {
    console.error(foundServices.error);
    throw new Error("problem finding services");
  }
  // console.log("found services:", foundServices.data);

  // Add mapping to the mapping store
  // const mappingService = foundServices.data[0]; // Pick first one
  const mappingService = foundServices.data.slice(-1)[0]; // Pick last one
  console.log("using mapping store:", mappingService.serviceUrl);
  const consumer = new Consumer({
    url: mappingService.serviceUrl,
    mappingUrl: mappingService.mappingUrl,
    profileId: SERVICEMAPPING_PROFILE_ID
  });

  let mappingEntry: Handler;

  // Try updating exsting mapping if exists
  if (mappingId) {
    console.log("updating existing mapping...");
    mappingEntry = await handle(
      consumer.perform({
        operation: "update",
        parameters: {
          mappingId: mappingId,
          mapping: loadMapping.data
        },
        response: ["update/mappingId", "update/mappingUrl"]
      })
    );
  } else {
    // Create new one
    console.log("creating mapping...");
    mappingEntry = await handle(
      consumer.perform({
        operation: "create",
        parameters: {
          mapping: loadMapping.data
        },
        response: ["create/mappingId", "create/mappingUrl"]
      })
    );
  }

  if (!mappingEntry.ok) {
    console.error(mappingEntry.error);
    throw new Error("problem setting mapping");
  }

  const mappingUrl = mappingId
    ? mappingEntry.data["update/mappingUrl"]
    : mappingEntry.data["create/mappingUrl"];
  if (!mappingUrl) {
    throw new Error("unable to retrieve new mapping url");
  }

  console.log(
    mappingId
      ? "--> mapping updated, mappingId:"
      : "--> mapping set new mapping, mappingId:",
    mappingEntry.data[mappingId ? "update/mappingId" : "create/mappingId"]
  );
  return mappingService.serviceUrl + mappingUrl + "/source";
}

export default setMappingStore;
