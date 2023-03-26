import Ingredient from "../../../domain/entities/ingredient";
import IngredientNotFoundError from "../../../domain/exceptions/ingredient/IngredientNotFoundError";
import IIngredientRepo from "../../../domain/repositories/IIngredientRepo";

class DeleteIngredient {
    private readonly ingredientRepo: IIngredientRepo;

    constructor(ingredientRepo: IIngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    async run(id: string): Promise<Ingredient> {
        const foundIngredient: Ingredient | null = await this.ingredientRepo.getById(id);

        if(foundIngredient) {
            const deletedIngredient = await this.ingredientRepo.delete(foundIngredient);
            if (deletedIngredient) return deletedIngredient;
        }

        throw new IngredientNotFoundError;
    }
}

export default DeleteIngredient;