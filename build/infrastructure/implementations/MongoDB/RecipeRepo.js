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
const recipe_1 = __importDefault(require("../../driven-adapters/MongoDB/models/recipe"));
class RecipeRepo {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const recipes = yield recipe_1.default.find().lean();
            return recipes;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipe = yield recipe_1.default.findOne({ uuid: id }).lean();
            return recipe;
        });
    }
    create(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdRecipe = yield recipe_1.default.create(recipe);
            return createdRecipe;
        });
    }
    update(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRecipe = yield recipe_1.default.findOneAndUpdate({ uuid: recipe.uuid }, recipe, { new: true, }).lean();
            return updateRecipe;
        });
    }
    delete(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedRecipe = yield recipe_1.default.findOneAndUpdate({ uuid: recipe.uuid }, {
                $set: {
                    status: "DELETED"
                }
            }, { new: true }).lean();
            return deletedRecipe;
        });
    }
}
exports.default = RecipeRepo;
