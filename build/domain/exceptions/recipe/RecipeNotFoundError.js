"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RecipeNotFoundError extends Error {
    constructor() {
        super("Recipe not found");
        this.name = "RecipeNotFound";
    }
}
exports.default = RecipeNotFoundError;
