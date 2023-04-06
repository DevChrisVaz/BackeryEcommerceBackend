"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ToppingNotFoundError extends Error {
    constructor() {
        super("Topping not found");
        this.name = "ToppingNotFound";
    }
}
exports.default = ToppingNotFoundError;
