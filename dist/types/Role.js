"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Role {
    constructor(name, color, permissionsBinary) {
        this.name = name;
        this.color = color;
        this.permissions = +permissionsBinary || 0;
    }
}
exports.default = Role;
