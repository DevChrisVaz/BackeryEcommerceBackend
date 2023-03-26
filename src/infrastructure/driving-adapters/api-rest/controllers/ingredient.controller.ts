import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import CreateIngredient from "../../../../application/usecases/ingredient/CreateIngredient";
import DeleteIngredient from "../../../../application/usecases/ingredient/DeleteIngredient";
import GetAllIngredients from "../../../../application/usecases/ingredient/GetAllIngredients";
import GetIngredientById from "../../../../application/usecases/ingredient/GetIngredientById";
import UpdateIngredient from "../../../../application/usecases/ingredient/UpdateIngredient";
import Ingredient from "../../../../domain/entities/ingredient";

class IngredientController {
    private readonly createIngredientUseCase: CreateIngredient;
    private readonly getIngredientByIdUseCase: GetIngredientById;
    private readonly getAllIngredientsUseCase: GetAllIngredients;
    private readonly updateIngredientUseCase: UpdateIngredient;
    private readonly deleteIngredientUseCase: DeleteIngredient;

    constructor(
        createIngredientUseCase: CreateIngredient,
        getIngredientByIdUseCase: GetIngredientById,
        getAllIngredientsUseCase: GetAllIngredients,
        updateIngredientUseCase: UpdateIngredient,
        deleteIngredientUseCase: DeleteIngredient
    ) {
        this.createIngredientUseCase = createIngredientUseCase,
        this.getIngredientByIdUseCase = getIngredientByIdUseCase,
        this.getAllIngredientsUseCase = getAllIngredientsUseCase,
        this.updateIngredientUseCase = updateIngredientUseCase,
        this.deleteIngredientUseCase = deleteIngredientUseCase
    }

    getAllIngredients = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ingredients: Ingredient[] = await this.getAllIngredientsUseCase.run();
            res.status(200).json(ingredients);
            return;
        } catch(err) {
            next(err);
        }
    }

    getIngredientById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const foundIngredient: Ingredient | null = await this.getIngredientByIdUseCase.run(id);
            res.status(200).json(foundIngredient);
            return;
        } catch (err) {
            next(err);
        }
    }

    createIngredient = async (req: Request, res: Response, next: NextFunction) => {
        const ingredient: Ingredient = req.body;
        try {
            ingredient.uuid = uuid();
            const createdIngredient = await this.createIngredientUseCase.run(ingredient);
            res.status(201).json(createdIngredient);
            return;
        } catch(err) {
            next(err);
        }
    }

    updateIngredient = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const ingredient: Ingredient = req.body;
        
        try {
            const updatedIngredient: Ingredient = await this.updateIngredientUseCase.run(id, ingredient);
            res.status(200).json(updatedIngredient);
            return;
        } catch(err) {
            next(err);
        }
    }

    deleteIngredient = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const deletedIngredient: Ingredient = await this.deleteIngredientUseCase.run(id);
            res.status(200).json(deletedIngredient);
            return;
        } catch(err) {
            next(err);
        }
    }
}

export default IngredientController;