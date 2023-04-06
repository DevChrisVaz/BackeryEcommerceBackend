"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InventoryNotFoundError extends Error {
    constructor() {
        super("Inventory not found");
        this.name = "InventoryNotFound";
    }
}
exports.default = InventoryNotFoundError;
