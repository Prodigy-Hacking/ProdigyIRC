export class Player {
    username: string;
    token: string;
    ign: string;
    privilege: number;
    socketID: string;
    constructor(username: string, token: string, socketID: string, ign: string, privilege: number) {
        this.username = username;
        this.token = token;
        this.socketID = socketID;
        this.ign = ign;
        this.privilege = privilege;
    }
}