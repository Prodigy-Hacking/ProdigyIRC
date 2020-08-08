"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.run = void 0;
const database_1 = require("../utils/database");
exports.run = async (socket, io, player, args) => {
    const username = args[0];
    const user = await database_1.databaseReadByUsername(username);
    if (!user)
        return socket.emit("ERR", "This user doesn't exist!");
    if (user.privilege >= player.privilege)
        return socket.emit("ERR", "Cannot mute a user with the same or higher rank!");
    user.privilege = 0;
    database_1.databaseUpdateByUsername(user, username);
    const userSocket = io.sockets.connected[user.socketID];
    userSocket?.emit("SYS", "You have been muted!");
    socket.emit("SYS", `${username} was muted successfully.`);
};
exports.help = {
    name: "mute",
    description: "Mute a user.",
    usages: [
        "/mute username",
        "/mute username 5m",
        "/mute username 2h",
        "/mute username 1d"
    ]
};
