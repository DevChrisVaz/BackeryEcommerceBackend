"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ToppingTypeAlreadyExistsError extends Error {
    constructor() {
        super("Topping type already exists");
        this.name = "ToppingTypeAlreadyExists";
    }
}
exports.default = ToppingTypeAlreadyExistsError;
