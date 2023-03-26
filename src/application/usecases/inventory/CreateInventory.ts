import Inventory from "../../../domain/entities/inventory";
import IInventoryRepo from "../../../domain/repositories/IInventoryRepo";

class CreateInventory {
    private readonly inventoryRepo: IInventoryRepo;

    constructor(inventoryRepo: IInventoryRepo) {
        this.inventoryRepo = inventoryRepo;
    }

    async run(inventory: Inventory): Promise<Inventory> {
        const createdInventory: Inventory = await this.inventoryRepo.create(inventory);
        return createdInventory;
    }
}

export default CreateInventory;