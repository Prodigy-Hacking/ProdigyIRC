"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(props) {
        this.name = props.help.name;
        this.description = props.help.description;
        this.usages = props.help.usages;
        this.permission = props.help.permission;
        this.run = props.run;
        this.props = props;
    }
}
exports.Command = Command;
