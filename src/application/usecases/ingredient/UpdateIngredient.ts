import Ingredient from "../../../domain/entities/ingredient";
import IngredientNotFoundError from "../../../domain/exceptions/ingredient/IngredientNotFoundError";
import IIngredientRepo from "../../../domain/repositories/IIngredientRepo";

class UpdateIngredient {
    private readonly ingredientRepo: IIngredientRepo;

    constructor(ingredientRepo: IIngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    async run(id: string, ingredient: Ingredient): Promise<Ingredient> {
        const foundIngredient: Ingredient | null = await this.ingredientRepo.getById(id);

        if (foundIngredient) {
            const ingredientToUpdate: Ingredient = {
                ...foundIngredient,
                ...ingredient
            }

            const updatedIngredient: Ingredient | null = await this.ingredientRepo.update(ingredientToUpdate);

            if (updatedIngredient) return updatedIngredient;
        }

        throw new IngredientNotFoundError();
    }
}

export default UpdateIngredient;