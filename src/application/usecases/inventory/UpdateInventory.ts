import Inventory from "../../../domain/entities/inventory";
import InventoryNotFoundError from "../../../domain/exceptions/inventory/InventoryNotFoundError";
import IInventoryRepo from "../../../domain/repositories/IInventoryRepo";
import GetInventoryById from "./GetInventoryById";

class UpdateInventory {
    private readonly inventoryRepo: IInventoryRepo;
    private readonly getInventoryById: GetInventoryById;

    constructor(inventoryRepo: IInventoryRepo) {
        this.inventoryRepo = inventoryRepo;
        this.getInventoryById = new GetInventoryById(inventoryRepo);
    }

    async run(id: string, inventory: Inventory): Promise<Inventory> {
        const foundInventory: Inventory | null = await this.getInventoryById.run(id);

        if (foundInventory) {
            const inventoryToUpdate: Inventory = {
                ...foundInventory,
                name: inventory.name ?? foundInventory.name,
                ingredients: inventory.ingredients ?? foundInventory.ingredients
            }

            const updatedInventory: Inventory | null = await this.inventoryRepo.update(inventoryToUpdate);

            if (updatedInventory) return updatedInventory;
        }

        throw new InventoryNotFoundError();
    }
}

export default UpdateInventory;