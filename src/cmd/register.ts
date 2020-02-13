import { handle } from "../util/handle";
import isValidURL from "../util/url";
import setMappingStore from "../util/mappingStore";
import { setService } from "../util/serviceRegistry";

export default async (argv: any) => {
  // Verify Service URL
  if (!isValidURL(argv.serviceUrl)) {
    console.error(
      `Error: service URL "${argv.serviceUrl}" is not a valid URL'`
    );
    process.exit(1);
  }

  // Verify Profile Id
  if (!argv.profile) {
    console.error(`Error: missing profile id'`);
    process.exit(1);
  }

  // Set mapping in the mapping store
  const mappingStoreEntry = await handle(
    setMappingStore(argv.mapping, argv.mappingId)
  );
  if (!mappingStoreEntry.ok) {
    console.error(mappingStoreEntry.error);
    process.exit(1);
  }

  // Set the registry entry in the service registry
  const serviceRegistryEntry = await handle(
    setService(argv.serviceUrl, argv.profile, mappingStoreEntry.data)
  );
  if (!serviceRegistryEntry.ok) {
    console.error(serviceRegistryEntry.error);
    process.exit(1);
  }

  console.log("--> service registered successfully: ");
  console.log(serviceRegistryEntry.data);
};
