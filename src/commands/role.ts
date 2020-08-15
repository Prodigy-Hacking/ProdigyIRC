import { Server, Socket } from "socket.io";
import { Player } from "../types/Player";
import { databaseReadByUsername, databaseUpdateByUsername, databaseWrite } from "../utils/database";

export const run = async (socket: Socket, io: Server, player: Player, args: string[]) => {
    const username = args[0]
    const roleName = args[1]
    const user = await databaseReadByUsername(username)
    const role = await databaseReadRole(username)

    if (!user) return socket.emit("ERR", "This user doesn't exist!")
    if (!role) return socket.emit("ERR", "This role doesn't exist!")
    if (user.roles.find(r => r == role)) return socket.emit("ERR", "This user already has this role!")
    if (user.getRoleLevel() <= player.getRoleLevel()) return socket.emit("ERR", "Cannot change the role of a user with the same or higher rank!")

    user.roles.push(role);
    databaseUpdateByUsername(user, username)

    socket.emit("SYS", `${username} now has the ${roleName} role!`)
}

export const help = {
    name: "role",
    description: "Change the role of a user.",
    usages: [
        "/role username [0-3]"
    ],
    permission: "MANAGE_USERS"
}