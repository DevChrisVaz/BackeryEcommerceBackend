"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IngredientNotFoundError extends Error {
    constructor() {
        super("Ingredient not found");
        this.name = "IngredientNotFound";
    }
}
exports.default = IngredientNotFoundError;
