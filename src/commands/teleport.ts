import { Server, Socket } from "socket.io";
import { Player } from "../types/Player";
import { databaseReadByUsername } from "../utils/database";

export const run = async (socket: Socket, io: Server, player: Player, args: string[]) => {
    const username = args[0]
    const user = await databaseReadByUsername(username)

    if (!player.hasPerm("MANAGE_USERS") && !user.canAccess(player, "INGAME_LOCATION")) {
        return socket.emit("ERR", "This player is not accepting teleport")
    }

    const userSocket = io.sockets.connected[user.socketID];
    userSocket.emit("REQ_LOC")
    userSocket.once("RES_LOC", loc => {
        socket.emit("LOC", loc)
    })
}

export const help = {
    name: "tp",
    description: "Teleport to a player.",
    usages: [
        "/tp username",
        "/tp teleporter teleportee"
    ],
    permission: "READ_PLAYER_INFO"
}