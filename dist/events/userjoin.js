"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const database_js_1 = require("../utils/database.js");
const usercreate_js_1 = require("./usercreate.js");
exports.handler = async (socket, io) => {
    return new Promise((res, rej) => {
        // When a user joins, check if they have an id token, if they do, use that to find username
        // If not create an id token for them and request a username
        socket.emit("REQ_AUTH");
        socket.on("RES_AUTH", async (authToken) => {
            authToken = await authToken ?? usercreate_js_1.handler(socket, io);
            if (authToken.length <= 0) {
                authToken = await usercreate_js_1.handler(socket, io);
            }
            // Search database for auth token
            const user = await database_js_1.databaseReadByToken(authToken);
            if (user) {
                socket.emit("UPDATE_AUTH", authToken);
                res(user);
            }
            else {
                socket.emit("ERR_AUTH");
                rej(new Error("Disappointment: Noot is disappointed with your lack of authentication credentials."));
            }
        });
    });
};
