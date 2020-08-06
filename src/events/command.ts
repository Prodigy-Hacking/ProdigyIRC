import { Socket, Server } from "socket.io";
import { Command } from "../types/Command";
import { Player } from "../types/Player";

export const handler = async (socket: Socket, io: Server, commands: Command[], player: Player, msg: string) => {
    msg = msg.slice(1);
    const messageArray = msg.split(/\s+/g);
    const commandName = messageArray.shift();

    const command = commands.find((command: Command) => command.name == commandName);
    if (player.privilege >= command?.props.privilege) command?.props.run(messageArray);
}