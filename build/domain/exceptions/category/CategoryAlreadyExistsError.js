"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CategoryAlreadyExistsError extends Error {
    constructor() {
        super("Category already exists");
        this.name = "CategoryAlreadyExists";
    }
}
exports.default = CategoryAlreadyExistsError;
