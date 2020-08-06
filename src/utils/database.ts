import fs from "fs";
import { join } from "path";
import { Player } from "../types/Player";

export const databaseReadByToken = async (token: string): Promise<Player> => {
    const database = JSON.parse(fs.readFileSync(join(__dirname, "../../userbase.json")).toString());

    return await database.find((entry: Player) => entry.token === token);
}

export const databaseReadByUsername = async (username: string): Promise<Player> => {
    const database = JSON.parse(fs.readFileSync(join(__dirname, "../../userbase.json")).toString());

    return await database.find((entry: Player) => entry.username === username);
}

export const databaseWrite = async (player: Player) => {
    const database = JSON.parse(fs.readFileSync(join(__dirname, "../../userbase.json")).toString());

    database.push(player);

    await fs.writeFileSync(join(__dirname, "../../userbase.json"), JSON.stringify(database));
}

export const databaseUpdateByToken = async (player: Player, token: string) => {
    const database = JSON.parse(fs.readFileSync(join(__dirname, "../../userbase.json")).toString());

    let existingUser: Player = database.find((user: Player) => user.token === token);

    if (existingUser) {
        database[database.indexOf(existingUser)] = player;
    }

    await fs.writeFileSync(join(__dirname, "../../userbase.json"), JSON.stringify(database));
}

export const databaseUpdateByUsername = async (player: Player, username: string) => {
    const database = JSON.parse(fs.readFileSync(join(__dirname, "../../userbase.json")).toString());

    let existingUser = database.find((user: Player) => user.username === username);

    if (existingUser) {
        database[database.indexOf(existingUser)] = player;
    }

    await fs.writeFileSync(join(__dirname, "../../userbase.json"), JSON.stringify(database));
}