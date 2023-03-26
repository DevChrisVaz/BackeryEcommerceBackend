import Ingredient from "../../../domain/entities/ingredient";
import IIngredientRepo from "../../../domain/repositories/IIngredientRepo";


class GetAllIngredients {
    private readonly ingredientRepo: IIngredientRepo;

    constructor(ingredientRepo: IIngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    async run(): Promise<Ingredient[]> {
        let ingredients: Ingredient[] = await this.ingredientRepo.getAll();
        ingredients = ingredients.filter(i => i.status !== "DELETED");
        return ingredients;
    }
}

export default GetAllIngredients;