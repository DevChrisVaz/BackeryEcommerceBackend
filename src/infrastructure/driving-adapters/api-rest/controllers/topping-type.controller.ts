import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import CreateCategory from "../../../../application/usecases/category/CreateCategory";
import DeleteCategory from "../../../../application/usecases/category/DeleteCategory";
import GetAllCategories from "../../../../application/usecases/category/GetAllCategories";
import GetCategoryById from "../../../../application/usecases/category/GetCategoryById";
import UpdateCategory from "../../../../application/usecases/category/UpdateCategory";
import Category from "../../../../domain/entities/category";

class CategoryController {
    private readonly createCategoryUseCase: CreateCategory;
    private readonly getCategoryByIdUseCase: GetCategoryById;
    private readonly getAllCategoriesUseCase: GetAllCategories;
    private readonly updateCategoryUseCase: UpdateCategory;
    private readonly deleteCategoryUseCase: DeleteCategory;

    constructor(
        createCategoryUseCase: CreateCategory,
        getCategoryByIdUseCase: GetCategoryById,
        getAllCategoriesUseCase: GetAllCategories,
        updateCategoryUseCase: UpdateCategory,
        deleteCategoryUseCase: DeleteCategory
    ) {
        this.createCategoryUseCase = createCategoryUseCase,
        this.getCategoryByIdUseCase = getCategoryByIdUseCase,
        this.getAllCategoriesUseCase = getAllCategoriesUseCase,
        this.updateCategoryUseCase = updateCategoryUseCase,
        this.deleteCategoryUseCase = deleteCategoryUseCase
    }

    getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories: Category[] = await this.getAllCategoriesUseCase.run();
            res.status(200).json(categories);
            return;
        } catch(err) {
            next(err);
        }
    }

    getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const foundCategory: Category | null = await this.getCategoryByIdUseCase.run(id);
            res.status(200).json(foundCategory);
            return;
        } catch (err) {
            next(err);
        }
    }

    createCategory = async (req: Request, res: Response, next: NextFunction) => {
        const category: Category = req.body;
        try {
            category.uuid = uuid();
            const createdCategory = await this.createCategoryUseCase.run(category);
            res.status(201).json(createdCategory);
            return;
        } catch(err) {
            next(err);
        }
    }

    updateCategory = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const category: Category = req.body;
        
        try {
            const updatedCategory: Category = await this.updateCategoryUseCase.run(id, category);
            res.status(200).json(updatedCategory);
            return;
        } catch(err) {
            next(err);
        }
    }

    deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const deletedCategory: Category = await this.deleteCategoryUseCase.run(id);
            res.status(200).json(deletedCategory);
            return;
        } catch(err) {
            next(err);
        }
    }
}

export default CategoryController;