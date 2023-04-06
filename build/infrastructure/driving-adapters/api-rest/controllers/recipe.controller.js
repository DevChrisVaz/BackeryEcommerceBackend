"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class RecipeController {
    constructor(createRecipeUseCase, getRecipeByIdUseCase, getAllRecipesUseCase, updateRecipeUseCase, deleteRecipeUseCase) {
        this.getAllRecipes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const recipes = yield this.getAllRecipesUseCase.run();
                res.status(200).json(recipes);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.getRecipeById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const foundRecipe = yield this.getRecipeByIdUseCase.run(id);
                res.status(200).json(foundRecipe);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createRecipe = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const recipe = req.body;
            try {
                recipe.uuid = (0, uuid_1.v4)();
                const createdRecipe = yield this.createRecipeUseCase.run(recipe);
                res.status(201).json(createdRecipe);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.updateRecipe = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const recipe = req.body;
            try {
                const updatedRecipe = yield this.updateRecipeUseCase.run(id, recipe);
                res.status(200).json(updatedRecipe);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteRecipe = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedRecipe = yield this.deleteRecipeUseCase.run(id);
                res.status(200).json(deletedRecipe);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createRecipeUseCase = createRecipeUseCase,
            this.getRecipeByIdUseCase = getRecipeByIdUseCase,
            this.getAllRecipesUseCase = getAllRecipesUseCase,
            this.updateRecipeUseCase = updateRecipeUseCase,
            this.deleteRecipeUseCase = deleteRecipeUseCase;
    }
}
exports.default = RecipeController;
