"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateCategory_1 = __importDefault(require("../../../../application/usecases/category/CreateCategory"));
const DeleteCategory_1 = __importDefault(require("../../../../application/usecases/category/DeleteCategory"));
const GetAllCategories_1 = __importDefault(require("../../../../application/usecases/category/GetAllCategories"));
const GetCategoryById_1 = __importDefault(require("../../../../application/usecases/category/GetCategoryById"));
const UpdateCategory_1 = __importDefault(require("../../../../application/usecases/category/UpdateCategory"));
const CategoryRepo_1 = __importDefault(require("../../../implementations/MongoDB/CategoryRepo"));
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const authorizeUser_1 = require("../middlewares/user/authorizeUser");
const categoryRepo = new CategoryRepo_1.default();
const getAllCategories = new GetAllCategories_1.default(categoryRepo);
const getCategoryById = new GetCategoryById_1.default(categoryRepo);
const createCategory = new CreateCategory_1.default(categoryRepo);
const updateCategory = new UpdateCategory_1.default(categoryRepo);
const deleteCategory = new DeleteCategory_1.default(categoryRepo);
const categoryController = new category_controller_1.default(createCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory);
const categoryRouter = (0, express_1.Router)();
categoryRouter.route('/')
    .get(categoryController.getAllCategories)
    .post(authorizeUser_1.authorizeUser, categoryController.createCategory);
categoryRouter.route('/:id')
    .get(categoryController.getCategoryById)
    .put(authorizeUser_1.authorizeUser, categoryController.updateCategory)
    .delete(authorizeUser_1.authorizeUser, categoryController.deleteCategory);
exports.default = categoryRouter;
