import Ingredient from "../../../domain/entities/ingredient";
import IngredientNotFoundError from "../../../domain/exceptions/ingredient/IngredientNotFoundError";
import IIngredientRepo from "../../../domain/repositories/IIngredientRepo";


class GetIngredientById {
    private readonly ingredientRepo: IIngredientRepo;

    constructor(ingredientRepo: IIngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    async run(id: string): Promise<Ingredient> {
        const foundIngredient: Ingredient | null = await this.ingredientRepo.getById(id);

        if(!foundIngredient) throw new IngredientNotFoundError();

        return foundIngredient;
    }
}

export default GetIngredientById;