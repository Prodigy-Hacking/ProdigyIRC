"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const database_js_1 = require("../utils/database.js");
const command_js_1 = require("./command.js");
exports.handler = async (socket, io, commands, token, msg) => {
    if (typeof msg !== "string")
        return socket.emit("pmgh{bru4_m0m3n7_gtf0_sk1d}");
    // Get player from token
    const player = await database_js_1.databaseReadByToken(token);
    // Set up command handler
    if (msg.startsWith("/"))
        return command_js_1.handler(socket, io, commands, player, msg);
    // Send message to all users
    io.emit("MSG", player.username, player.ign, player.privilege, msg);
};
