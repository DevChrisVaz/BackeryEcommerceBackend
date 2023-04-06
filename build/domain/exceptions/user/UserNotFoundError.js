"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserNotFoundError extends Error {
    constructor() {
        super("User not found");
        this.name = "UserNotFound";
    }
}
exports.default = UserNotFoundError;
