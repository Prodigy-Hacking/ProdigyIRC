export class Command {
    name: string;
    description: string;
    usages: string[];
    permission: string;
    run: Function;
    props: any;
    constructor(props: any) {
        this.name = props.help.name;
        this.description = props.help.description;
        this.usages = props.help.usages;
        this.permission = props.help.permission;
        this.run = props.run;
        this.props = props;
    }
}