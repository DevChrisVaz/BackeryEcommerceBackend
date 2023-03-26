import { Router } from "express";
import CreateCategory from "../../../../application/usecases/category/CreateCategory";
import DeleteCategory from "../../../../application/usecases/category/DeleteCategory";
import GetAllCategories from "../../../../application/usecases/category/GetAllCategories";
import GetCategoryById from "../../../../application/usecases/category/GetCategoryById";
import UpdateCategory from "../../../../application/usecases/category/UpdateCategory";
import CategoryRepo from "../../../implementations/MongoDB/CategoryRepo";
import CategoryController from "../controllers/category.controller";

const categoryRepo = new CategoryRepo();
const getAllCategories = new GetAllCategories(categoryRepo);
const getCategoryById = new GetCategoryById(categoryRepo);
const createCategory = new CreateCategory(categoryRepo);
const updateCategory = new UpdateCategory(categoryRepo);
const deleteCategory = new DeleteCategory(categoryRepo);
const categoryController = new CategoryController(
    createCategory,
    getCategoryById,
    getAllCategories,
    updateCategory,
    deleteCategory
)

const categoryRouter = Router();

categoryRouter.route('/')
    .get(categoryController.getAllCategories)
    .post(categoryController.createCategory);
categoryRouter.route('/:id')
    .get(categoryController.getCategoryById)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

export default categoryRouter;