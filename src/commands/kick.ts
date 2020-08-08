import { Server, Socket } from "socket.io";
import { Player } from "../types/Player";
import { databaseReadByUsername, databaseUpdateByUsername, databaseWrite } from "../utils/database";

export const run = async (socket: Socket, io: Server, player: Player, args: string[]) => {
    const username = args[0]
    const user = await databaseReadByUsername(username)

    if (!user) return socket.emit("ERR", "This user doesn't exist!")
    if (user.privilege >= player.privilege) return socket.emit("ERR", "Cannot kick a user with the same or higher rank!")

    const userSocket = io.sockets.connected[user.socketID];
    if (!userSocket) return socket.emit("ERR", "This user isn't online!")
    
    userSocket.emit("SYS", "You have been kicked!")
    userSocket.disconnect()

    socket.emit("SYS", `${username} was kicked successfully.`)
}

export const help = {
    name: "kick",
    description: "Kick a user.",
    usages: [
        "/kick username"
    ]
}