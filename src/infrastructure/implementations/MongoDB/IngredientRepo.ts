import Ingredient from "../../../domain/entities/ingredient";
import IIngredientRepo from "../../../domain/repositories/IIngredientRepo";
import ingredientModel from "../../driven-adapters/MongoDB/models/ingredient";

class IngredientRepo implements IIngredientRepo {
    async getAll(findArgs?: any): Promise<Ingredient[]> {
        const ingredients: Ingredient[] = await ingredientModel.find(findArgs && findArgs).lean();
        return ingredients;
    }

    async findMany(findArgs?: Ingredient, qty?: number): Promise<Ingredient[]> {
        const ingredients: Ingredient[] = await ingredientModel.find(findArgs ?? {}).limit(qty ?? 0).lean();
        return ingredients;
    }

    async getById(id: string): Promise<Ingredient | null> {
        const ingredient: Ingredient | null = await ingredientModel.findOne({ uuid: id }).lean();
        return ingredient;
    }

    async findOne(findArgs?: Ingredient): Promise<Ingredient | null> {
        const ingredient: Ingredient | null = await ingredientModel.findOne(findArgs).lean();
        return ingredient;
    }
    
    async getByUserName(userName: string): Promise<Ingredient | null> {
        const ingredient: Ingredient | null = await ingredientModel.findOne({ userName }).lean();
        return ingredient;
    }

    async create(ingredient: Ingredient): Promise<Ingredient> {
        const createdIngredient: Ingredient = await ingredientModel.create(ingredient);
        return createdIngredient;
    }

    async update(ingredient: Ingredient): Promise<Ingredient | null> {
        const updatedIngredient = await ingredientModel.findOneAndUpdate({ uuid: ingredient.uuid }, 
            ingredient, { new: true,  }).lean();
        return updatedIngredient;
    }

    async delete(ingredient: Ingredient): Promise<Ingredient | null> {
        const deletedIngredient = await ingredientModel.findOneAndUpdate({ uuid: ingredient.uuid }, {
            $set: {
                status: "DELETED"
            }
        }, { new: true }).lean();
        return deletedIngredient;
    }
}

export default IngredientRepo;