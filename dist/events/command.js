"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
exports.handler = async (socket, io, commands, player, msg) => {
    msg = msg.slice(1);
    const messageArray = msg.split(/\s+/g);
    const commandName = messageArray.shift();
    const command = commands.find((command) => command.name == commandName);
    if (player.privilege >= command?.props.privilege)
        command?.props.run(messageArray);
};
