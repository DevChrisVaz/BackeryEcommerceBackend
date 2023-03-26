import Category from "../../../domain/entities/category";
import CategoryNotFoundError from "../../../domain/exceptions/category/CategoryNotFoundError";
import ICategoryRepo from "../../../domain/repositories/ICategoryRepo";

class UpdateCategory {
    private readonly categoryRepo: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    async run(id: string, category: Category): Promise<Category> {
        const foundCategory: Category | null = await this.categoryRepo.getById(id);

        if (foundCategory) {
            const categoryToUpdate: Category = {
                ...foundCategory,
                ...category
            }

            const updatedCategory: Category | null = await this.categoryRepo.update(categoryToUpdate);

            if (updatedCategory) return updatedCategory;
        }

        throw new CategoryNotFoundError();
    }
}

export default UpdateCategory;