import { Register, Consumer } from "superdriver";
import handle from "./handle";

const REGISTRY_URL =
  process.env.REGISTRY_URL || "https://registry.superface.dev";
const SERVICEMAPPING_PROFILE_ID =
  "http://supermodel.io/superface/mappingstore/ServiceMapping";

async function setMappingStore(mapping: string) {
  console.info("using registry", REGISTRY_URL);

  // Find mapping store
  const register = new Register(REGISTRY_URL);
  const foundServices = await handle(
    register.findServices(SERVICEMAPPING_PROFILE_ID)
  );
  if (!foundServices.ok) {
    console.error("Error: problem finding services");
    console.error(foundServices.error);
    process.exit(1);
  }

  console.log("found services:", foundServices.data);

  // Add mapping to the mapping store
  const mappingService = foundServices.data[0]; // Pick first one
  const consumer = new Consumer({
    url: mappingService.serviceUrl,
    mappingUrl: mappingService.mappingUrl,
    profileId: SERVICEMAPPING_PROFILE_ID
  });

  const result = await handle(
    consumer.perform({
      operation: "create",
      parameters: {
        mapping: mapping
      },
      response: [
        "create/mappingId",
        "create/mappingUrl",
      ]
    })
  );

  console.log(result);
}

export default setMappingStore;
