import { Server, Socket } from "socket.io";
import { Player } from "../types/Player.js";
import { databaseReadByToken } from "../utils/database.js";

import { handler as userCreationHandler } from "./usercreate.js";

export const handler = async (socket: Socket, io: Server): Promise<Player> => {
	return new Promise((res, rej) => {
		// When a user joins, check if they have an id token, if they do, use that to find username
		// If not create an id token for them and request a username
		socket.emit("REQ_AUTH");
		socket.on("RES_AUTH", async authToken => {
			if (!(authToken && authToken.length > 0)) {
				authToken = await userCreationHandler(socket, io);
			}

			// Search database for auth token
			const user = await databaseReadByToken(authToken)

			if (user) {
				socket.emit("UPDATE_AUTH", authToken);
				res(user);
			} else {
				socket.emit("ERR_AUTH");
				rej(new Error("Disappointment: Noot is disappointed with your lack of authentication credentials."));
			}
		})
	})
}