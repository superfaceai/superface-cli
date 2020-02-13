import { Register } from "superdriver";
import { handle } from "./handle";

const REGISTRY_URL =
  process.env.REGISTRY_URL || "https://registry.superface.dev";

console.log("using registry", REGISTRY_URL);

async function setService(
  serviceUrl: string,
  profileId: string,
  mappingUrl: string
) {
  // Check if already registered
  const register = new Register(REGISTRY_URL);
  const foundServices = await handle(register.findServices(profileId));
  if (foundServices.ok) {
    const registeredService = foundServices.data.find(entry => {
      return entry.serviceUrl === serviceUrl;
    });

    // If already registered, unregister first
    if (registeredService) {
      console.log(
        `service ${registeredService.serviceUrl} is already registered, unregistering...`
      );
      const unregister = await handle(
        register.unregisterService({ serviceUrl: registeredService.url })
      );
      if (!unregister.ok) {
        console.error(unregister.error);
        throw new Error("error unregistering service");
      }
      console.log("--> service unregistered");
    }
  }

  // Register service at the registry
  const registerEntry = {
    serviceUrl: serviceUrl,
    mappingUrl: mappingUrl,
    semanticProfile: profileId
  };

  console.log("registering:", registerEntry);
  return register.registerService(registerEntry);
}

export { setService, REGISTRY_URL };
