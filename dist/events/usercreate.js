"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const Player_1 = require("../types/Player");
const database_1 = require("../utils/database");
exports.handler = async (socket, io) => {
    return new Promise(async (res, rej) => {
        const token = await generateToken(32);
        socket.emit("REQ_USERNAME");
        socket.on("RES_USERNAME", async (username, ign) => {
            // Check if username already exists
            if (await database_1.databaseReadByUsername(username)) {
                socket.emit("ERR_USERNAME", "Username taken!");
                rej(new Error("Username taken!"));
            }
            else {
                // Create username
                database_1.databaseWrite(new Player_1.Player(username, token, socket.id, ign, 1));
                res(token);
            }
            return rej(new Error("Done."));
        });
        async function generateToken(n) {
            let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let token = "";
            for (let i = 0; i < n; i++) {
                token += chars[Math.floor(Math.random() * chars.length)];
            }
            return await database_1.databaseReadByToken(token) ? generateToken(n) : token;
        }
    });
};
