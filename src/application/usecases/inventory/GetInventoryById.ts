import Inventory from "../../../domain/entities/inventory";
import InventoryNotFoundError from "../../../domain/exceptions/inventory/InventoryNotFoundError";
import IInventoryRepo from "../../../domain/repositories/IInventoryRepo";

class GetInventoryById {
    private readonly inventoryRepo: IInventoryRepo;

    constructor(inventoryRepo: IInventoryRepo) {
        this.inventoryRepo = inventoryRepo;
    }

    async run(id: string): Promise<Inventory> {
        const foundInventory: Inventory | null = await this.inventoryRepo.getById(id);

        if(!foundInventory) throw new InventoryNotFoundError();

        return foundInventory;
    }
}

export default GetInventoryById;