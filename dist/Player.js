"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
	constructor(player) {
		this.username = player.username;
	}
	get IGN() {
		return this.formatAsIGN();
	}
	formatAsIGN() {
		return this.username.replace(/(?<=.).(?=.)/g, "*");
	}
}
exports.Player = Player;
