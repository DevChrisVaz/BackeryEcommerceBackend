import Recipe from "../../../domain/entities/recipe";
import RecipeNotFoundError from "../../../domain/exceptions/recipe/RecipeNotFoundError";
import IRecipeRepo from "../../../domain/repositories/IRecipeRepo";

class DeleteRecipe {
    private readonly recipeRepo: IRecipeRepo;

    constructor(recipeRepo: IRecipeRepo) {
        this.recipeRepo = recipeRepo;
    }

    async run(id: string): Promise<Recipe> {
        const foundRecipe: Recipe | null = await this.recipeRepo.getById(id);

        if(foundRecipe) {
            const deletedRecipe = await this.recipeRepo.delete(foundRecipe);

            if(deletedRecipe) return deletedRecipe;
        }

        throw new RecipeNotFoundError();
    }
}

export default DeleteRecipe;