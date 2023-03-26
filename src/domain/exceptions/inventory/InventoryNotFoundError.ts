class InventoryNotFoundError extends Error {
    constructor() {
        super("Inventory not found");
        this.name = "InventoryNotFound"
    }
}

export default InventoryNotFoundError;