"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const permissions = require("../../permissions.json");
class Player {
    constructor(username, token, socketID, ign, roles) {
        this.username = username;
        this.token = token;
        this.socketID = socketID;
        this.ign = ign;
        this.roles = roles;
    }
    hasPerm(permissionName) {
        return !!(this.roles.map(role => role.permissions).reduce((a, b) => a | b) >> permissions.indexOf(permissionName) & 1);
    }
}
exports.Player = Player;
