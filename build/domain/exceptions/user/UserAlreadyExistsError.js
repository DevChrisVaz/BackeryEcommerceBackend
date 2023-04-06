"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserAlreadyExistsError extends Error {
    constructor() {
        super("User already exists");
        this.name = "UserAlreadyExists";
    }
}
exports.default = UserAlreadyExistsError;
