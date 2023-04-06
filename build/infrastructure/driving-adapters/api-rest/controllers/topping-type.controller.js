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
class CategoryController {
    constructor(createCategoryUseCase, getCategoryByIdUseCase, getAllCategoriesUseCase, updateCategoryUseCase, deleteCategoryUseCase) {
        this.getAllCategories = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.getAllCategoriesUseCase.run();
                res.status(200).json(categories);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.getCategoryById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const foundCategory = yield this.getCategoryByIdUseCase.run(id);
                res.status(200).json(foundCategory);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const category = req.body;
            try {
                category.uuid = (0, uuid_1.v4)();
                const createdCategory = yield this.createCategoryUseCase.run(category);
                res.status(201).json(createdCategory);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.updateCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const category = req.body;
            try {
                const updatedCategory = yield this.updateCategoryUseCase.run(id, category);
                res.status(200).json(updatedCategory);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedCategory = yield this.deleteCategoryUseCase.run(id);
                res.status(200).json(deletedCategory);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createCategoryUseCase = createCategoryUseCase,
            this.getCategoryByIdUseCase = getCategoryByIdUseCase,
            this.getAllCategoriesUseCase = getAllCategoriesUseCase,
            this.updateCategoryUseCase = updateCategoryUseCase,
            this.deleteCategoryUseCase = deleteCategoryUseCase;
    }
}
exports.default = CategoryController;
