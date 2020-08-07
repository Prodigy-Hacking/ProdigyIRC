"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.run = void 0;
const database_1 = require("../utils/database");
exports.run = async (socket, io, player, args) => {
    const username = args[0];
    const user = await database_1.databaseReadByUsername(username);
    user.privilege = 0;
    database_1.databaseUpdateByUsername(user, username);
    const userSocket = io.sockets.connected[user.socketID];
    userSocket.emit("SYS", "You have been muted!");
};
exports.help = {
    name: "mute",
    description: "Mute a user."
};
