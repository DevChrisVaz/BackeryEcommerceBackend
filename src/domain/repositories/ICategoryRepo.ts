import Category from "../entities/category";

interface ICategoryRepo {
    getAll(): Promise<Category[]>;
    getById(id: string): Promise<Category | null>;
    getOne(params: Category): Promise<Category | null>;
    create(category: Category): Promise<Category>;
    update(category: Category): Promise<Category | null>;
    delete(category: Category): Promise<Category | null>;
}

export default ICategoryRepo;