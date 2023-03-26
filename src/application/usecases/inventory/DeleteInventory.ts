import Inventory from "../../../domain/entities/inventory";
import InventoryNotFoundError from "../../../domain/exceptions/inventory/InventoryNotFoundError";
import IInventoryRepo from "../../../domain/repositories/IInventoryRepo";

class DeleteInventory {
    private readonly inventoryRepo: IInventoryRepo;

    constructor(inventoryRepo: IInventoryRepo) {
        this.inventoryRepo = inventoryRepo;
    }

    async run(id: string): Promise<Inventory> {
        const foundInventory: Inventory | null = await this.inventoryRepo.getById(id);

        if(foundInventory) {
            const deletedInventory = await this.inventoryRepo.delete(foundInventory);
            if (deletedInventory) return deletedInventory;
        }

        throw new InventoryNotFoundError();
    }
}

export default DeleteInventory;