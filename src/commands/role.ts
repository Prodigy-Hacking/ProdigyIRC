import { Server, Socket } from "socket.io";
import { Player } from "../types/Player";
import { databaseReadByUsername, databaseUpdateByUsername, databaseWrite } from "../utils/database";

export const run = async (socket: Socket, io: Server, player: Player, args: string[]) => {
    const username = args[0]
    const newPrivilege = +args[1]
    const user = await databaseReadByUsername(username)

    if (!user) return socket.emit("ERR", "This user doesn't exist!")
    if (user.privilege >= player.privilege) return socket.emit("ERR", "Cannot change the role of a user with the same or higher rank!")

    user.privilege = Math.min(Math.max(newPrivilege, 0), 3)
    databaseUpdateByUsername(user, username)

    socket.emit("SYS", `${username}'s role was updated to ${newPrivilege} successfully!`)
}

export const help = {
    name: "role",
    description: "Change the role of a user.",
    usages: [
        "/role username [0-3]"
    ]
}