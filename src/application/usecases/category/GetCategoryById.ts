import Category from "../../../domain/entities/category";
import CategoryNotFoundError from "../../../domain/exceptions/category/CategoryNotFoundError";
import ICategoryRepo from "../../../domain/repositories/ICategoryRepo";

class GetCategoryById {
    private readonly categoryRepo: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    async run(id: string): Promise<Category> {
        const foundCategory: Category | null = await this.categoryRepo.getById(id);

        if(!foundCategory) throw new CategoryNotFoundError();

        return foundCategory;
    }
}

export default GetCategoryById;