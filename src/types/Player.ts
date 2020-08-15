import Role from "./Role";
const permissions = require("../../permissions.json");
const roles = require("../../roles.json");

export class Player {
    username: string;
    token: string;
    socketID: string;
    ign: string;
    roles: Role[];
    friends: string[];
    constructor(username: string, token: string, socketID: string, ign: string, roles: Role[], friends: string[]) {
        this.username = username;
        this.token = token;
        this.socketID = socketID;
        this.ign = ign;
        this.roles = roles;
        this.friends = friends;
    }

    hasPerm(permissionName: string) {
        return !!(this.roles.map(role => role.permissions).reduce((a, b) => a | b) >> permissions.indexOf(permissionName) & 1)
    }

    getRoleLevel() {
        let maxRole: Role = this.roles[0];
        this.roles.forEach(role => {
            if (roles.indexOf(role) < roles.indexOf(maxRole)) {
                maxRole = role;
            }
        });
        return roles.length - roles.indexOf(maxRole);
    }
}