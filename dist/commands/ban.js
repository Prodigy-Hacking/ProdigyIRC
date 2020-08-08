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
        return socket.emit("ERR", "Cannot ban a user with the same or higher rank!");
    user.privilege = -1;
    database_1.databaseUpdateByUsername(user, username);
    const userSocket = io.sockets.connected[user.socketID];
    userSocket?.emit("SYS", "You have been banned!");
    userSocket?.disconnect();
    socket.emit("SYS", `${username} was banned successfully.`);
};
exports.help = {
    name: "ban",
    description: "Ban a user.",
    usages: [
        "/ban username",
        "/ban username 5m",
        "/ban username 2h",
        "/ban username 1d"
    ]
};
