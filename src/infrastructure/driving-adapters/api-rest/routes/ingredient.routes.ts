import { Router } from "express";
import CreateIngredient from "../../../../application/usecases/ingredient/CreateIngredient";
import DeleteIngredient from "../../../../application/usecases/ingredient/DeleteIngredient";
import GetAllIngredients from "../../../../application/usecases/ingredient/GetAllIngredients";
import GetIngredientById from "../../../../application/usecases/ingredient/GetIngredientById";
import UpdateIngredient from "../../../../application/usecases/ingredient/UpdateIngredient";
import IngredientRepo from "../../../implementations/MongoDB/IngredientRepo";
import IngredientController from "../controllers/ingredient.controller";
import { authorizeUser } from "../middlewares/user/authorizeUser";

const ingredientRepo = new IngredientRepo();
const getAllIngredients = new GetAllIngredients(ingredientRepo);
const getIngredientById = new GetIngredientById(ingredientRepo);
const createIngredient = new CreateIngredient(ingredientRepo);
const updateIngredient = new UpdateIngredient(ingredientRepo);
const deleteIngredient = new DeleteIngredient(ingredientRepo);
const ingredientController = new IngredientController(
    createIngredient,
    getIngredientById,
    getAllIngredients,
    updateIngredient,
    deleteIngredient
)

const ingredientRouter = Router();

ingredientRouter.route('/')
    .get(ingredientController.getAllIngredients)
    .post(authorizeUser, ingredientController.createIngredient);
ingredientRouter.route('/:id')
    .get(authorizeUser, ingredientController.getIngredientById)
    .put(authorizeUser, ingredientController.updateIngredient)
    .delete(authorizeUser, ingredientController.deleteIngredient);

export default ingredientRouter;