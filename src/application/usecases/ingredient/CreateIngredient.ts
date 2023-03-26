import Ingredient from "../../../domain/entities/ingredient";
import IIngredientRepo from "../../../domain/repositories/IIngredientRepo";


class CreateIngredient {
    private readonly ingredientRepo: IIngredientRepo;

    constructor(ingredientRepo: IIngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    async run(ingredient: Ingredient): Promise<Ingredient> {
        const createdIngredient: Ingredient = await this.ingredientRepo.create(ingredient);
        return createdIngredient;
    }
}

export default CreateIngredient;