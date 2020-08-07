import { Server, Socket } from "socket.io";
import { Player } from "../types/Player";
import { databaseReadByUsername, databaseUpdateByUsername, databaseWrite } from "../utils/database";

export const run = async (socket: Socket, io: Server, player: Player, args: string[]) => {
    const username = args[0]
    const user = await databaseReadByUsername(username)
    user.privilege = -1;
    databaseUpdateByUsername(user, username);

    const userSocket = io.sockets.connected[user.socketID];
    userSocket.emit("SYS", "You have been banned!")
    userSocket.disconnect()
}

export const help = {
    name: "ban",
    description: "Ban a user."
}