import { Server, Socket } from "socket.io";
import { Player } from "../types/Player";
import Role from "../types/Role";
import { databaseWriteRole } from "../utils/database";

export const run = async (socket: Socket, io: Server, player: Player, args: string[]) => {
    const roleName = args[0]
    const color = args[1]
    const permsBin = args[2]

    const newRole = new Role(roleName, color, permsBin);

    databaseWriteRole(newRole);

    socket.emit("SYS", `${roleName} role was created successfully.`)
}

export const help = {
    name: "addrole",
    description: "Adds a role.",
    usages: [
        "/addrole rolename",
        "/addrole rolename #c01075",
        "/addrole rolename #c01075 [0-2048]",
    ],
    permission: "MANAGE_ROLES"
}