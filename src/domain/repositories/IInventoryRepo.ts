import Inventory from "../entities/inventory";

interface IInventoryRepo {
    getAll(): Promise<Inventory[]>;
    getById(id: string): Promise<Inventory | null>;
    create(inventory: Inventory): Promise<Inventory>;
    update(inventory: Inventory): Promise<Inventory | null>;
    delete(inventory: Inventory): Promise<Inventory | null>;
}

export default IInventoryRepo;