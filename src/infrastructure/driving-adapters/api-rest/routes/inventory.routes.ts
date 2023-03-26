import { Router } from "express";
import CreateInventory from "../../../../application/usecases/inventory/CreateInventory";
import DeleteInventory from "../../../../application/usecases/inventory/DeleteInventory";
import GetAllInventories from "../../../../application/usecases/inventory/GetAllInventories";
import GetInventoryById from "../../../../application/usecases/inventory/GetInventoryById";
import UpdateInventory from "../../../../application/usecases/inventory/UpdateInventory";
import InventoryRepo from "../../../implementations/MongoDB/InventoryRepo";
import InventoryController from "../controllers/inventory.controller";

const inventoryRepo = new InventoryRepo();
const getAllInventories = new GetAllInventories(inventoryRepo);
const getInventoryById = new GetInventoryById(inventoryRepo);
const createInventory = new CreateInventory(inventoryRepo);
const updateInventory = new UpdateInventory(inventoryRepo);
const deleteInventory = new DeleteInventory(inventoryRepo);
const inventoryController = new InventoryController(
    createInventory,
    getInventoryById,
    getAllInventories,
    updateInventory,
    deleteInventory
)

const inventoryRouter = Router();

inventoryRouter.route('/')
    .get(inventoryController.getAllInventories)
    .post(inventoryController.createInventory);
inventoryRouter.route('/:id')
    .get(inventoryController.getInventoryById)
    .put(inventoryController.updateInventory)
    .delete(inventoryController.deleteInventory);

export default inventoryRouter;