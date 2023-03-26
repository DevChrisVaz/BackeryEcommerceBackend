import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import CreateInventory from "../../../../application/usecases/inventory/CreateInventory";
import DeleteInventory from "../../../../application/usecases/inventory/DeleteInventory";
import GetAllInventories from "../../../../application/usecases/inventory/GetAllInventories";
import GetInventoryById from "../../../../application/usecases/inventory/GetInventoryById";
import UpdateInventory from "../../../../application/usecases/inventory/UpdateInventory";
import Inventory from "../../../../domain/entities/inventory";

class InventoryController {
    private readonly createInventoryUseCase: CreateInventory;
    private readonly getInventoryByIdUseCase: GetInventoryById;
    private readonly getAllInventoriesUseCase: GetAllInventories;
    private readonly updateInventoryUseCase: UpdateInventory;
    private readonly deleteInventoryUseCase: DeleteInventory;

    constructor(
        createInventoryUseCase: CreateInventory,
        getInventoryByIdUseCase: GetInventoryById,
        getAllInventoriesUseCase: GetAllInventories,
        updateInventoryUseCase: UpdateInventory,
        deleteInventoryUseCase: DeleteInventory
    ) {
        this.createInventoryUseCase = createInventoryUseCase,
        this.getInventoryByIdUseCase = getInventoryByIdUseCase,
        this.getAllInventoriesUseCase = getAllInventoriesUseCase,
        this.updateInventoryUseCase = updateInventoryUseCase,
        this.deleteInventoryUseCase = deleteInventoryUseCase
    }

    getAllInventories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const inventories: Inventory[] = await this.getAllInventoriesUseCase.run();
            res.status(200).json(inventories);
            return;
        } catch(err) {
            next(err);
        }
    }

    getInventoryById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const foundInventory: Inventory | null = await this.getInventoryByIdUseCase.run(id);
            res.status(200).json(foundInventory);
            return;
        } catch (err) {
            next(err);
        }
    }

    createInventory = async (req: Request, res: Response, next: NextFunction) => {
        const inventory: Inventory = req.body;
        try {
            inventory.uuid = uuid();
            const createdInventory = await this.createInventoryUseCase.run(inventory);
            res.status(201).json(createdInventory);
            return;
        } catch(err) {
            next(err);
        }
    }

    updateInventory = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const inventory: Inventory = req.body;
        
        try {
            const updatedInventory: Inventory = await this.updateInventoryUseCase.run(id, inventory);
            res.status(200).json(updatedInventory);
            return;
        } catch(err) {
            next(err);
        }
    }

    deleteInventory = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const deletedInventory: Inventory = await this.deleteInventoryUseCase.run(id);
            res.status(200).json(deletedInventory);
            return;
        } catch(err) {
            next(err);
        }
    }
}

export default InventoryController;