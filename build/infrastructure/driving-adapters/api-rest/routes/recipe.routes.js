"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateRecipe_1 = __importDefault(require("../../../../application/usecases/Recipe/CreateRecipe"));
const DeleteRecipe_1 = __importDefault(require("../../../../application/usecases/Recipe/DeleteRecipe"));
const GetAllRecipes_1 = __importDefault(require("../../../../application/usecases/Recipe/GetAllRecipes"));
const GetRecipeById_1 = __importDefault(require("../../../../application/usecases/Recipe/GetRecipeById"));
const UpdateRecipe_1 = __importDefault(require("../../../../application/usecases/Recipe/UpdateRecipe"));
const RecipeRepo_1 = __importDefault(require("../../../implementations/MongoDB/RecipeRepo"));
const recipe_controller_1 = __importDefault(require("../controllers/recipe.controller"));
const authorizeUser_1 = require("../middlewares/user/authorizeUser");
const recipeRepo = new RecipeRepo_1.default();
const getAllRecipes = new GetAllRecipes_1.default(recipeRepo);
const getRecipeById = new GetRecipeById_1.default(recipeRepo);
const createRecipe = new CreateRecipe_1.default(recipeRepo);
const updateRecipe = new UpdateRecipe_1.default(recipeRepo);
const deleteRecipe = new DeleteRecipe_1.default(recipeRepo);
const recipeController = new recipe_controller_1.default(createRecipe, getRecipeById, getAllRecipes, updateRecipe, deleteRecipe);
const recipeRouter = (0, express_1.Router)();
recipeRouter.route('/')
    .get(authorizeUser_1.authorizeUser, recipeController.getAllRecipes)
    .post(authorizeUser_1.authorizeUser, recipeController.createRecipe);
recipeRouter.route('/:id')
    .get(authorizeUser_1.authorizeUser, recipeController.getRecipeById)
    .put(authorizeUser_1.authorizeUser, recipeController.updateRecipe)
    .delete(authorizeUser_1.authorizeUser, recipeController.deleteRecipe);
exports.default = recipeRouter;
