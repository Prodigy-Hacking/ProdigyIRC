import { Server, Socket } from "socket.io";
import { Player } from "../types/Player";
import { databaseReadByUsername, databaseUpdateByUsername, databaseWrite } from "../utils/database";

export const run = async (socket: Socket, io: Server, player: Player, args: string[]) => {
    const username = args[0]
    const user = await databaseReadByUsername(username)

    if (!user) return socket.emit("ERR", "This user doesn't exist!")
    if (user.getRoleLevel() <= player.getRoleLevel()) return socket.emit("ERR", "Cannot mute a user with the same or higher rank!")

    user.privilege = 0;
    databaseUpdateByUsername(user, username);

    const userSocket = io.sockets.connected[user.socketID];
    userSocket?.emit("SYS", "You have been muted!")
    
    socket.emit("SYS", `${username} was muted successfully.`)
}

export const help = {
    name: "mute",
    description: "Mute a user.",
    usages: [
        "/mute username",
        "/mute username 5m",
        "/mute username 2h",
        "/mute username 1d"
    ],
    permission: "MUTE_USERS"
}