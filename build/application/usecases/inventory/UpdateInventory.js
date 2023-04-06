"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryNotFoundError_1 = __importDefault(require("../../../domain/exceptions/inventory/InventoryNotFoundError"));
const GetInventoryById_1 = __importDefault(require("./GetInventoryById"));
class UpdateInventory {
    constructor(inventoryRepo) {
        this.inventoryRepo = inventoryRepo;
        this.getInventoryById = new GetInventoryById_1.default(inventoryRepo);
    }
    run(id, inventory) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const foundInventory = yield this.getInventoryById.run(id);
            if (foundInventory) {
                const inventoryToUpdate = Object.assign(Object.assign({}, foundInventory), { name: (_a = inventory.name) !== null && _a !== void 0 ? _a : foundInventory.name, ingredients: (_b = inventory.ingredients) !== null && _b !== void 0 ? _b : foundInventory.ingredients });
                const updatedInventory = yield this.inventoryRepo.update(inventoryToUpdate);
                if (updatedInventory)
                    return updatedInventory;
            }
            throw new InventoryNotFoundError_1.default();
        });
    }
}
exports.default = UpdateInventory;
