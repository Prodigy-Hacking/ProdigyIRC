export class Command {
    name: string;
    props: any;
    constructor(name: string, props: any) {
        this.name = name;
        this.props = props;
    }
}