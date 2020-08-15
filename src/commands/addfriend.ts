import { Server, Socket } from "socket.io";
import { Player } from "../types/Player";
import Role from "../types/Role";
import { databaseReadByUsername, databaseUpdateByUsername, databaseWriteRole } from "../utils/database";

export const run = async (socket: Socket, io: Server, player: Player, args: string[]) => {
    const username = args[0]
    const user = databaseReadByUsername(username)

    if (!user) return socket.emit("ERR", "This user doesn't exist!")
    socket.emit("REQ_FRIEND", player);
    socket.once("RES_FRIEND", accepted => {
        if (accepted) {
            player.friends.push()
            databaseUpdateByUsername()
        }
    });
    socket.emit("SYS", `A friend request was successfully sent to ${username}.`)
}

export const help = {
    name: "addfriend",
    description: "Sends a friend request to a user.",
    usages: [
        "/addrole rolename",
        "/addrole rolename #c01075",
        "/addrole rolename #c01075 [200-48]",
    ],
    permission: "MANAGE_ROLES"
}