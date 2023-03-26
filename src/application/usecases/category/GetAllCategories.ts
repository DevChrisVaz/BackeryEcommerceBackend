import Category from "../../../domain/entities/category";
import ICategoryRepo from "../../../domain/repositories/ICategoryRepo";

class GetAllCategories {
    private readonly categoryRepo: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    async run(): Promise<Category[]> {
        let categories: Category[] = await this.categoryRepo.getAll();
        categories = categories.filter(i => i.status !== "DELETED");
        return categories;
    }
}

export default GetAllCategories;