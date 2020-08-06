"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.run = void 0;
const database_1 = require("../utils/database");
exports.run = async (socket, io, player, args) => {
    const username = args[0];
    const newPrivilege = +args[1];
    const user = await database_1.databaseReadByUsername(username);
    user.privilege = Math.min(Math.max(newPrivilege, 0), 3);
    database_1.databaseUpdateByUsername(user, username);
};
exports.help = {
    name: "role",
    description: "Change the role of a user."
};
