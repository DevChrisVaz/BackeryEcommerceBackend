import Recipe from "../../../domain/entities/recipe";
import IRecipeRepo from "../../../domain/repositories/IRecipeRepo";

class CreateRecipe {
    private readonly recipeRepo: IRecipeRepo;

    constructor(recipeRepo: IRecipeRepo) {
        this.recipeRepo = recipeRepo;
    }

    async run(recipe: Recipe): Promise<Recipe> {
        const createRecipe: Recipe = await this.recipeRepo.create(recipe);
        return createRecipe;
    }
}

export default CreateRecipe;