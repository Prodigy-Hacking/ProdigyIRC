"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const command_js_1 = require("./command.js");
exports.handler = async (socket, io, commands, player, msg) => {
    if (typeof msg !== "string")
        return socket.emit("pmgh{bru4_m0m3n7_gtf0_sk1d}");
    // Set up command handler
    if (msg.startsWith("/"))
        return command_js_1.handler(socket, io, commands, player, msg);
    // Send message to all users
    io.emit("MSG", player, msg);
};
