export class Player {
    username: string;
    token: string;
    ign: string;
    privilege: number;
    constructor(username: string, token: string, ign: string, privilege: number) {
        this.username = username;
        this.token = token;
        this.ign = ign;
        this.privilege = privilege;
    }
}