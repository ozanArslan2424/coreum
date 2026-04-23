import type { RouteModel } from "@/BaseRoute/RouteModel";

export type RegistryDocEntry = {
	id: string;
	endpoint: string;
	method: string;
	model: RouteModel<any, any, any, any> | undefined;
};
