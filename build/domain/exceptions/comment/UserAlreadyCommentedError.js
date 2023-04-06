"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserAlreadyCommentedError extends Error {
    constructor() {
        super("User already commented");
        this.name = "UserAlreadyCommented";
    }
}
exports.default = UserAlreadyCommentedError;
