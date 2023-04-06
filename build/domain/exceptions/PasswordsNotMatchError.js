"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PasswordsNotMatchError extends Error {
    constructor() {
        super("Passwords don't match");
        this.name = "PasswordsNotMatch";
    }
}
exports.default = PasswordsNotMatchError;
