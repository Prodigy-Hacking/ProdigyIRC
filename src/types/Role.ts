interface Permission<TValue> {
    [id: string]: TValue;
}

export default class Role {
    name: string;
    color: string;
    permissions: number;

    constructor(name: string, color: string, permissionsBinary: string) {
        this.name = name;
        this.color = color;

        this.permissions = +permissionsBinary || 0;
    }
}