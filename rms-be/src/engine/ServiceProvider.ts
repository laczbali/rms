import { DbProvider } from "../database/DbProvider";

export class ServiceProvider {

    /**
     * Register all services here.
     * The service name should be the same as the class name.
     */
    private static readonly serviceDefinitions: Map<string, (sp: ServiceProvider) => any> = new Map([

        ["DbProvider", () => new DbProvider()]

    ]);

    /**
     * Stores the initialized services.
     */
    private static services: Map<string, any> = new Map();

    /**
     * Resolves a service (and its dependencies).
     * Use the name of the service class as the service name input.
     * @param serviceName 
     * @returns 
     */
    public static resolve<T>(serviceName: string): T {
        if (!ServiceProvider.services.has(serviceName)) {
            var serviceLoader = ServiceProvider.serviceDefinitions.get(serviceName);
            if (serviceLoader == null || serviceLoader == undefined) {
                throw new Error("Service not defined: " + serviceName);
            }

            var service = serviceLoader(this);
            ServiceProvider.services.set(serviceName, service);
        }

        return ServiceProvider.services.get(serviceName);
    }

}