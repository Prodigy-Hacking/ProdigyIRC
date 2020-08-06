import { Server, Socket } from "socket.io";
import { Player } from "../types/Player";
import { databaseReadByUsername, databaseUpdateByUsername, databaseWrite } from "../utils/database";

export const run = async (socket: Socket, io: Server, player: Player, args: string[]) => {
    const username = args[0]
    const newPrivilege = +args[1]
    const user = await databaseReadByUsername(username)

    user.privilege = Math.min(Math.max(newPrivilege, 0), 3)
    databaseUpdateByUsername(user, username)
}

export const help = {
    name: "role",
    description: "Change the role of a user."
}