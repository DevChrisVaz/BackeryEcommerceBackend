import Category from "../../../domain/entities/category";
import CategoryNotFoundError from "../../../domain/exceptions/category/CategoryNotFoundError";
import ICategoryRepo from "../../../domain/repositories/ICategoryRepo";

class GetOneCategory {
    private readonly categoryRepo: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    async run(params: Category): Promise<Category> {
        const foundCategory: Category | null = await this.categoryRepo.getOne(params);

        if(!foundCategory) throw new CategoryNotFoundError();

        return foundCategory;
    }
}

export default GetOneCategory;