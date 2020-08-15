"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const privileges = require("../../privileges.json");
exports.handler = async (socket, io, commands, player, msg) => {
    msg = msg.slice(1);
    const messageArray = msg.split(/\s+/g);
    const commandName = messageArray.shift();
    const command = commands.find((command) => command.name == commandName);
    if (command) {
        if (player.hasPerm(command.permission)) {
            if (command.name == "help")
                command.run(socket, io, commands, player, messageArray);
            else
                command.run(socket, io, player, messageArray);
        }
        else {
            return socket.emit("ERR", "You don't have permission to run this command!");
        }
    }
};
