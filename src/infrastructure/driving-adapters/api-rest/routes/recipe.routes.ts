import { Router } from "express";
import CreateRecipe from "../../../../application/usecases/Recipe/CreateRecipe";
import DeleteRecipe from "../../../../application/usecases/Recipe/DeleteRecipe";
import GetAllRecipes from "../../../../application/usecases/Recipe/GetAllRecipes";
import GetRecipeById from "../../../../application/usecases/Recipe/GetRecipeById";
import UpdateRecipe from "../../../../application/usecases/Recipe/UpdateRecipe";
import RecipeRepo from "../../../implementations/MongoDB/RecipeRepo";
import RecipeController from "../controllers/recipe.controller";
import { authorizeUser } from "../middlewares/user/authorizeUser";

const recipeRepo = new RecipeRepo();
const getAllRecipes = new GetAllRecipes(recipeRepo);
const getRecipeById = new GetRecipeById(recipeRepo);
const createRecipe = new CreateRecipe(recipeRepo);
const updateRecipe = new UpdateRecipe(recipeRepo);
const deleteRecipe = new DeleteRecipe(recipeRepo);
const recipeController = new RecipeController(
    createRecipe,
    getRecipeById,
    getAllRecipes,
    updateRecipe,
    deleteRecipe
)

const recipeRouter = Router();

recipeRouter.route('/')
    .get(authorizeUser, recipeController.getAllRecipes)
    .post(authorizeUser, recipeController.createRecipe);
recipeRouter.route('/:id')
    .get(authorizeUser, recipeController.getRecipeById)
    .put(authorizeUser, recipeController.updateRecipe)
    .delete(authorizeUser, recipeController.deleteRecipe);

export default recipeRouter;