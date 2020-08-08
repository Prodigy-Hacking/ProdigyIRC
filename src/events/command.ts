import { Socket, Server } from "socket.io";
import { Command } from "../types/Command";
import { Player } from "../types/Player";
const privileges = require("../../privileges.json");

export const handler = async (socket: Socket, io: Server, commands: Command[], player: Player, msg: string) => {
    msg = msg.slice(1);
    const messageArray = msg.split(/\s+/g);
    const commandName = messageArray.shift();

    const command = commands.find((command: Command) => command.name == commandName);
    if (command) {
        const privilegeNeeded = privileges[command.name];
        if (player.privilege >= privilegeNeeded) {
            if (command.name == "help") command.props.run(socket, io, commands, player, messageArray)
            else command.props.run(socket, io, player, messageArray);
        } else {
            return socket.emit("ERR", "You don't have permission to run this command!")
        }
    }
}