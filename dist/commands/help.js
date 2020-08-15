"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.run = void 0;
const privileges = require("../../privileges.json");
exports.run = async (socket, io, commands, player, args) => {
    const commandName = args[0];
    if (commandName) {
        const command = commands.find(command => command.name == commandName);
        if (!command)
            return socket.emit("ERR", `No command called ${commandName}`);
        socket.emit("SYS", `HELP - ${command.name}:\n\nDescription: ${command.description}\nUsage: ${command.usages.join(", ")}`);
    }
    else {
        socket.emit("SYS", "HELP\n\n" + commands
            .filter(command => player.hasPerm(command.permission))
            .map(command => `${command.name} - ${command.description}`).join("\n"));
    }
};
exports.help = {
    name: "help",
    description: "Opens help menu or gets info about a specific command.",
    usages: [
        "/help",
        "/help commandname"
    ],
    permission: "CONNECT"
};
