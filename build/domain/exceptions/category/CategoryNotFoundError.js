"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CategoryNotFoundError extends Error {
    constructor() {
        super("Category not found");
        this.name = "CategoryNotFound";
    }
}
exports.default = CategoryNotFoundError;
