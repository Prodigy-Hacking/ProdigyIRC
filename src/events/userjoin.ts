import { Server, Socket } from "socket.io";
import { Player } from "../types/Player.js";
import { databaseReadByToken, databaseUpdateByToken } from "../utils/database.js";

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
			let user = await databaseReadByToken(authToken)
			
			if (user) {
				if (user.privilege < 0) {
					socket.emit("ERR_AUTH", "Your account is banned!");
					socket.disconnect();
					return rej(new Error("Account banned."));
				}

				socket.emit("UPDATE_AUTH", authToken);
			} else {
				socket.emit("ERR_AUTH", "Malformed authentication token detected! Creating account instead...");

				authToken = await userCreationHandler(socket, io);
				socket.emit("UPDATE_AUTH", authToken);
				user = await databaseReadByToken(authToken)
			}

			user.socketID = socket.id;
			databaseUpdateByToken(user, authToken);

			res(user);
		})
	})
}