import { TC } from "../_modules";

export async function parseBody<T>(r: TC.Request | TC.Response | Response): Promise<T> {
	return await TC.Parser.parseBody<T>(r);
}
