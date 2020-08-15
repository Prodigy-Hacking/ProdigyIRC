import { Server, Socket } from "socket.io";
import { Player } from "../types/Player";
import { databaseReadByUsername, databaseUpdateByUsername, databaseWrite } from "../utils/database";

export const run = async (socket: Socket, io: Server, player: Player, args: string[]) => {
    const username = args[0]
    const user = await databaseReadByUsername(username)

    if (!user) return socket.emit("ERR", "This user doesn't exist!")
    if (user.privilege >= player.privilege) return socket.emit("ERR", "Cannot ban a user with the same or higher rank!")

    user.privilege = -1;
    databaseUpdateByUsername(user, username);

    const userSocket = io.sockets.connected[user.socketID];
    userSocket?.emit("SYS", "You have been banned!")
    userSocket?.disconnect()

    socket.emit("SYS", `${username} was banned successfully.`)
}

export const help = {
    name: "ban",
    description: "Ban a user.",
    usages: [
        "/ban username",
        "/ban username 5m",
        "/ban username 2h",
        "/ban username 1d"
    ],
    permission: "BAN_USERS"
}