import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import CreateRecipe from "../../../../application/usecases/Recipe/CreateRecipe";
import DeleteRecipe from "../../../../application/usecases/Recipe/DeleteRecipe";
import GetAllRecipes from "../../../../application/usecases/Recipe/GetAllRecipes";
import GetRecipeById from "../../../../application/usecases/Recipe/GetRecipeById";
import UpdateRecipe from "../../../../application/usecases/Recipe/UpdateRecipe";
import Recipe from "../../../../domain/entities/recipe";

class RecipeController {
    private readonly createRecipeUseCase: CreateRecipe;
    private readonly getRecipeByIdUseCase: GetRecipeById;
    private readonly getAllRecipesUseCase: GetAllRecipes;
    private readonly updateRecipeUseCase: UpdateRecipe;
    private readonly deleteRecipeUseCase: DeleteRecipe;

    constructor(
        createRecipeUseCase: CreateRecipe,
        getRecipeByIdUseCase: GetRecipeById,
        getAllRecipesUseCase: GetAllRecipes,
        updateRecipeUseCase: UpdateRecipe,
        deleteRecipeUseCase: DeleteRecipe
    ) {
        this.createRecipeUseCase = createRecipeUseCase,
        this.getRecipeByIdUseCase = getRecipeByIdUseCase,
        this.getAllRecipesUseCase = getAllRecipesUseCase,
        this.updateRecipeUseCase = updateRecipeUseCase,
        this.deleteRecipeUseCase = deleteRecipeUseCase
    }

    getAllRecipes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const recipes: Recipe[] = await this.getAllRecipesUseCase.run();
            res.status(200).json(recipes);
            return;
        } catch(err) {
            next(err);
        }
    }

    getRecipeById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const foundRecipe: Recipe | null = await this.getRecipeByIdUseCase.run(id);
            res.status(200).json(foundRecipe);
            return;
        } catch (err) {
            next(err);
        }
    }

    createRecipe = async (req: Request, res: Response, next: NextFunction) => {
        const recipe: Recipe = req.body;
        try {
            recipe.uuid = uuid();
            const createdRecipe = await this.createRecipeUseCase.run(recipe);
            res.status(201).json(createdRecipe);
            return;
        } catch(err) {
            next(err);
        }
    }

    updateRecipe = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const recipe: Recipe = req.body;
        
        try {
            const updatedRecipe: Recipe = await this.updateRecipeUseCase.run(id, recipe);
            res.status(200).json(updatedRecipe);
            return;
        } catch(err) {
            next(err);
        }
    }

    deleteRecipe = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const deletedRecipe: Recipe = await this.deleteRecipeUseCase.run(id);
            res.status(200).json(deletedRecipe);
            return;
        } catch(err) {
            next(err);
        }
    }
}

export default RecipeController;