"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidTokenError extends Error {
    constructor() {
        super("Invalid token");
        this.name = "InvalidTokenError";
    }
}
exports.default = InvalidTokenError;
