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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class InventoryController {
    constructor(createInventoryUseCase, getInventoryByIdUseCase, getAllInventoriesUseCase, updateInventoryUseCase, deleteInventoryUseCase) {
        this.getAllInventories = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const inventories = yield this.getAllInventoriesUseCase.run();
                res.status(200).json(inventories);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.getInventoryById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const foundInventory = yield this.getInventoryByIdUseCase.run(id);
                res.status(200).json(foundInventory);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createInventory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const inventory = req.body;
            try {
                inventory.uuid = (0, uuid_1.v4)();
                const createdInventory = yield this.createInventoryUseCase.run(inventory);
                res.status(201).json(createdInventory);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.updateInventory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const inventory = req.body;
            try {
                const updatedInventory = yield this.updateInventoryUseCase.run(id, inventory);
                res.status(200).json(updatedInventory);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteInventory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedInventory = yield this.deleteInventoryUseCase.run(id);
                res.status(200).json(deletedInventory);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createInventoryUseCase = createInventoryUseCase,
            this.getInventoryByIdUseCase = getInventoryByIdUseCase,
            this.getAllInventoriesUseCase = getAllInventoriesUseCase,
            this.updateInventoryUseCase = updateInventoryUseCase,
            this.deleteInventoryUseCase = deleteInventoryUseCase;
    }
}
exports.default = InventoryController;
