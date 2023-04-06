import Category from "../../../domain/entities/category";
import CategoryAlreadyExistsError from "../../../domain/exceptions/category/CategoryAlreadyExistsError";
import ICategoryRepo from "../../../domain/repositories/ICategoryRepo";

class CreateCategory {
    private readonly categoryRepo: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    async run(category: Category): Promise<Category> {
        let foundCategory: Category | null = await this.categoryRepo.getOne({ name: category.name, type: category.type });
        if (foundCategory) {
            foundCategory = {
                ...foundCategory,
                ...category,
                status: "ACTIVE"     
            }
        };
        const createdCategory: Category = await this.categoryRepo.create(category);
        return createdCategory;
    }
}

export default CreateCategory;