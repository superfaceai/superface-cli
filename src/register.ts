import handle from "./util/handle";
import isValidURL from "./util/url";
import { readYAMLFileToJSON } from "./util/readYAML";
import setMappingStore from "./util/mappingStore";

export default async (argv: any) => {
  // console.log(argv.serviceUrl, argv.profile, argv.mapping);

  // Verify Service URL
  if (!isValidURL(argv.serviceUrl)) {
    console.error(`Error: service URL "${argv.serviceUrl}" is not a valid URL'`);
    process.exit(1);
  }

  // Verify Profile Id
  if (!argv.profile)  {
    console.error(`Error: missing profile id'`);
    process.exit(1);
  }

  // Load Mapping file
  const loadMapping = await handle(readYAMLFileToJSON(argv.mapping));
  if (!loadMapping.ok) {
    console.error('Error: failed loading mapping file');
    console.error(loadMapping.error);
    process.exit(1);
  }

  console.log(loadMapping.data);

  // Set mapping in the mapping store
  setMappingStore(loadMapping.data);

  // Register service at the registry
}


