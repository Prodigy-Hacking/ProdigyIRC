"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseWrite = exports.databaseReadByUsername = exports.databaseReadByToken = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
exports.databaseReadByToken = async (token) => {
    const database = JSON.parse(fs_1.default.readFileSync(path_1.join(__dirname, "../../userbase.json")).toString());
    return await database.find((entry) => entry.token === token);
};
exports.databaseReadByUsername = async (username) => {
    const database = JSON.parse(fs_1.default.readFileSync(path_1.join(__dirname, "../../userbase.json")).toString());
    return await database.find((entry) => entry.username === username);
};
exports.databaseWrite = async (player) => {
    const database = JSON.parse(fs_1.default.readFileSync(path_1.join(__dirname, "../../userbase.json")).toString());
    database.push(player);
    await fs_1.default.writeFileSync(path_1.join(__dirname, "../../userbase.json"), JSON.stringify(database));
};
