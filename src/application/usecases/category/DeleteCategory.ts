import Category from "../../../domain/entities/category";
import CategoryNotFoundError from "../../../domain/exceptions/category/CategoryNotFoundError";
import ICategoryRepo from "../../../domain/repositories/ICategoryRepo";

class DeleteCategory {
    private readonly categoryRepo: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    async run(id: string): Promise<Category> {
        const foundCategory: Category | null = await this.categoryRepo.getById(id);

        if(foundCategory) {
            const deletedCategory = await this.categoryRepo.delete(foundCategory);
            if (deletedCategory) return deletedCategory;
        }

        throw new CategoryNotFoundError;
    }
}

export default DeleteCategory;