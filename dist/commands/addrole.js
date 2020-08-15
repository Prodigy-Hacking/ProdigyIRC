"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.run = void 0;
const Role_1 = __importDefault(require("../types/Role"));
const database_1 = require("../utils/database");
exports.run = async (socket, io, player, args) => {
    const roleName = args[0];
    const color = args[1];
    const permsBin = args[2];
    const newRole = new Role_1.default(roleName, color, permsBin);
    database_1.databaseWriteRole(newRole);
    socket.emit("SYS", `${roleName} role was created successfully.`);
};
exports.help = {
    name: "addrole",
    description: "Adds a role.",
    usages: [
        "/addrole rolename",
        "/addrole rolename #c01075",
        "/addrole rolename #c01075 [0-2048]",
    ],
    permission: "MANAGE_ROLES"
};
