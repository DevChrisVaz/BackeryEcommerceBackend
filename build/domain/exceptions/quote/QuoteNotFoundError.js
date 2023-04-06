"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuoteNotFoundError extends Error {
    constructor() {
        super("Cotización no encontrada");
        this.name = "QuoteNotFound";
    }
}
exports.default = QuoteNotFoundError;
