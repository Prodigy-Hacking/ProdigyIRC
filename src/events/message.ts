import { Server, Socket } from "socket.io";
import { Command } from "../types/Command.js";
import { Player } from "../types/Player.js";
import { databaseReadByToken } from "../utils/database.js";
import { handler as commandHandler } from "./command.js";

export const handler = async (socket: Socket, io: Server, commands: Command[], token: string, msg: string) => {
    if (typeof msg !== "string") return socket.emit("pmgh{bru4_m0m3n7_gtf0_sk1d}");

    // Get player from token
    const player: Player = await databaseReadByToken(token);

    // Set up command handler
    if (msg.startsWith("/")) return commandHandler(socket, io, commands, player, msg);

    // Send message to all users
    io.emit("MSG", player.username, player.ign, player.privilege, msg);
}