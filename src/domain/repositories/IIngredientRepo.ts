import Ingredient from "../entities/ingredient";


interface IIngredientRepo {
    getAll(findArgs?: any): Promise<Ingredient[]>;
    getById(id: string): Promise<Ingredient | null>;
    create(ingredient: Ingredient): Promise<Ingredient>;
    update(ingredient: Ingredient): Promise<Ingredient | null>;
    delete(ingredient: Ingredient): Promise<Ingredient | null>;
}

export default IIngredientRepo;