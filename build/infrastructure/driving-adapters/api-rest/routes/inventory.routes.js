"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateInventory_1 = __importDefault(require("../../../../application/usecases/inventory/CreateInventory"));
const DeleteInventory_1 = __importDefault(require("../../../../application/usecases/inventory/DeleteInventory"));
const GetAllInventories_1 = __importDefault(require("../../../../application/usecases/inventory/GetAllInventories"));
const GetInventoryById_1 = __importDefault(require("../../../../application/usecases/inventory/GetInventoryById"));
const UpdateInventory_1 = __importDefault(require("../../../../application/usecases/inventory/UpdateInventory"));
const InventoryRepo_1 = __importDefault(require("../../../implementations/MongoDB/InventoryRepo"));
const inventory_controller_1 = __importDefault(require("../controllers/inventory.controller"));
const authorizeUser_1 = require("../middlewares/user/authorizeUser");
const inventoryRepo = new InventoryRepo_1.default();
const getAllInventories = new GetAllInventories_1.default(inventoryRepo);
const getInventoryById = new GetInventoryById_1.default(inventoryRepo);
const createInventory = new CreateInventory_1.default(inventoryRepo);
const updateInventory = new UpdateInventory_1.default(inventoryRepo);
const deleteInventory = new DeleteInventory_1.default(inventoryRepo);
const inventoryController = new inventory_controller_1.default(createInventory, getInventoryById, getAllInventories, updateInventory, deleteInventory);
const inventoryRouter = (0, express_1.Router)();
inventoryRouter.route('/')
    .get(authorizeUser_1.authorizeUser, inventoryController.getAllInventories)
    .post(authorizeUser_1.authorizeUser, inventoryController.createInventory);
inventoryRouter.route('/:id')
    .get(authorizeUser_1.authorizeUser, inventoryController.getInventoryById)
    .put(authorizeUser_1.authorizeUser, inventoryController.updateInventory)
    .delete(authorizeUser_1.authorizeUser, inventoryController.deleteInventory);
exports.default = inventoryRouter;
