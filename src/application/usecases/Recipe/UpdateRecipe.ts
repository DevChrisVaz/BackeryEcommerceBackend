import Recipe from "../../../domain/entities/recipe";
import RecipeNotFoundError from "../../../domain/exceptions/recipe/RecipeNotFoundError";
import IRecipeRepo from "../../../domain/repositories/IRecipeRepo";

class UpdateRecipe {
    private readonly recipeRepo: IRecipeRepo;

    constructor(recipeRepo: IRecipeRepo) {
        this.recipeRepo = recipeRepo;
    }

    async run(id: string, recipe: Recipe): Promise<Recipe> {
        const foundRecipe: Recipe | null = await this.recipeRepo.getById(id);

        if (foundRecipe) {
            const recipeToUpdate: Recipe = {
                ...foundRecipe,
                ...recipe
            }

            const updatedRecipe: Recipe | null = await this.recipeRepo.update(recipeToUpdate);

            if (updatedRecipe) return updatedRecipe;
        }

        throw new RecipeNotFoundError();
    }
}

export default UpdateRecipe;