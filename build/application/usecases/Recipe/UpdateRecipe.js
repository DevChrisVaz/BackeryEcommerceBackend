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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RecipeNotFoundError_1 = __importDefault(require("../../../domain/exceptions/recipe/RecipeNotFoundError"));
class UpdateRecipe {
    constructor(recipeRepo) {
        this.recipeRepo = recipeRepo;
    }
    run(id, recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundRecipe = yield this.recipeRepo.getById(id);
            if (foundRecipe) {
                const recipeToUpdate = Object.assign(Object.assign({}, foundRecipe), recipe);
                const updatedRecipe = yield this.recipeRepo.update(recipeToUpdate);
                if (updatedRecipe)
                    return updatedRecipe;
            }
            throw new RecipeNotFoundError_1.default();
        });
    }
}
exports.default = UpdateRecipe;
