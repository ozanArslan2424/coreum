import { Server } from "@/modules/Server/Server";

export const testServer = new Server();
testServer.setGlobalPrefix("gello");
// testServer.setOnError((err) => {
// 	console.log(err);
// 	process.exit(1);
// });
