import fs from "fs";
import { join } from "path";
import { Player } from "../types/Player";

export const databaseReadByToken = async (token: string) => {
    const database = JSON.parse(fs.readFileSync(join(__dirname, "../../userbase.json")).toString());

    return await database.find((entry: Player) => entry.token === token);
}

export const databaseReadByUsername = async (username: string) => {
    const database = JSON.parse(fs.readFileSync(join(__dirname, "../../userbase.json")).toString());

    return await database.find((entry: Player) => entry.username === username);
}

export const databaseWrite = async (player: Player) => {
    const database = JSON.parse(fs.readFileSync(join(__dirname, "../../userbase.json")).toString());

    database.push(player);

    await fs.writeFileSync(join(__dirname, "../../userbase.json"), JSON.stringify(database));
}