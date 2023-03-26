import Recipe from "../../../domain/entities/recipe";
import RecipeNotFoundError from "../../../domain/exceptions/recipe/RecipeNotFoundError";
import IRecipeRepo from "../../../domain/repositories/IRecipeRepo";

class GetRecipeById {
    private readonly recipeRepo: IRecipeRepo;

    constructor(recipeRepo: IRecipeRepo) {
        this.recipeRepo = recipeRepo;
    }

    async run(id: string): Promise<Recipe> {
        const foundRecipe: Recipe | null = await this.recipeRepo.getById(id);

        if(!foundRecipe) throw new RecipeNotFoundError();

        return foundRecipe;
    }
}

export default GetRecipeById;