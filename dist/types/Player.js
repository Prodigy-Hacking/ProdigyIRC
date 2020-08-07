"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(username, token, socketID, ign, privilege) {
        this.username = username;
        this.token = token;
        this.socketID = socketID;
        this.ign = ign;
        this.privilege = privilege;
    }
}
exports.Player = Player;
