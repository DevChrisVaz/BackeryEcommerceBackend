class IngredientNotFoundError extends Error {
    constructor() {
        super("Ingredient not found");
        this.name = "IngredientNotFound";
    }
}

export default IngredientNotFoundError;