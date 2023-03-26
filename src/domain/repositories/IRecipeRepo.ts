import Recipe from "../entities/recipe";

interface IRecipeRepo {
    getAll(): Promise<Recipe[]>;
    getById(id: string): Promise<Recipe | null>;
    create(recipe: Recipe): Promise<Recipe>;
    update(recipe: Recipe): Promise<Recipe | null>;
    delete(recipe: Recipe): Promise<Recipe | null>;
}

export default IRecipeRepo;