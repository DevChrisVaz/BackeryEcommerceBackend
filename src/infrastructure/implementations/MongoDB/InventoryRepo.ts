import Inventory from "../../../domain/entities/inventory";
import IInventoryRepo from "../../../domain/repositories/IInventoryRepo";
import inventoryModel from "../../driven-adapters/MongoDB/models/inventory";

class InventoryRepo implements IInventoryRepo {
    async getAll(): Promise<Inventory[]> {
        const inventories: Inventory[] = await inventoryModel.find().lean();
        return inventories;
    }
    async getById(id: string): Promise<Inventory | null> {
        const inventory: Inventory | null = await inventoryModel.findOne({ uuid: id }).lean();
        return inventory;
    }
    async create(inventory: Inventory): Promise<Inventory> {
        const createdInventory: Inventory = await inventoryModel.create(inventory);
        return createdInventory;
    }
    async update(inventory: Inventory): Promise<Inventory | null> {
        const updatedInventory = await inventoryModel.findOneAndUpdate({ uuid: inventory.uuid }, 
            inventory, { new: true,  }).lean();
        return updatedInventory;
    }
    async delete(inventory: Inventory): Promise<Inventory | null> {
        const deletedInventory = await inventoryModel.findOneAndUpdate({ uuid: inventory.uuid }, {
            $set: {
                status: "DELETED"
            }
        }, { new: true }).lean();
        return deletedInventory;
    }

}

export default InventoryRepo;