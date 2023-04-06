"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductNotFoundError extends Error {
    constructor() {
        super("Product not found");
        this.name = "ProductNotFound";
    }
}
exports.default = ProductNotFoundError;
