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
        socket.once("RES_AUTH", async (authToken) => {
            if (!(authToken && authToken.length > 0)) {
                authToken = await usercreate_js_1.handler(socket, io);
            }
            // Search database for auth token
            let user = await database_js_1.databaseReadByToken(authToken);
            if (user) {
                if (user.privilege < 0) {
                    socket.emit("ERR_AUTH", "Your account is banned!");
                    socket.disconnect();
                    return rej(new Error("Account banned."));
                }
                socket.emit("UPDATE_AUTH", authToken);
            }
            else {
                socket.emit("ERR_AUTH", "Malformed authentication token detected! Creating account instead...");
                authToken = await usercreate_js_1.handler(socket, io);
                socket.emit("UPDATE_AUTH", authToken);
                user = await database_js_1.databaseReadByToken(authToken);
            }
            user.socketID = socket.id;
            database_js_1.databaseUpdateByToken(user, authToken);
            res(user);
        });
    });
};
