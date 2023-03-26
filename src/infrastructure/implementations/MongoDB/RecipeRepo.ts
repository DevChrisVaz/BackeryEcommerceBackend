import Recipe from "../../../domain/entities/recipe";
import IRecipeRepo from "../../../domain/repositories/IRecipeRepo";
import recipeModel from "../../driven-adapters/MongoDB/models/recipe";

class RecipeRepo implements IRecipeRepo {
    async getAll(): Promise<Recipe[]> {
        const recipes: Recipe[] = await recipeModel.find().lean();
        return recipes;
    }

    async getById(id: string): Promise<Recipe | null> {
        const recipe: Recipe | null = await recipeModel.findOne({ uuid: id }).lean();
        return recipe;
    }
    async create(recipe: Recipe): Promise<Recipe> {
        const createdRecipe: Recipe = await recipeModel.create(recipe);
        return createdRecipe;
    }
    async update(recipe: Recipe): Promise<Recipe | null> {
        const updateRecipe = await recipeModel.findOneAndUpdate({ uuid: recipe.uuid }, 
            recipe, { new: true,  }).lean();
        return updateRecipe;
    }
    async delete(recipe: Recipe): Promise<Recipe | null> {
        const deletedRecipe = await recipeModel.findOneAndUpdate({ uuid: recipe.uuid }, {
            $set: {
                status: "DELETED"
            }
        }, { new: true }).lean();
        return deletedRecipe;
    }

}

export default RecipeRepo;