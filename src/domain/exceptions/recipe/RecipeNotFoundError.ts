class RecipeNotFoundError extends Error {
    constructor() {
        super("Recipe not found");
        this.name = "RecipeNotFound";
    }
}

export default RecipeNotFoundError;