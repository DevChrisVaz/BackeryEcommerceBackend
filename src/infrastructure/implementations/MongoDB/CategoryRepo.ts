import Category from "../../../domain/entities/category";
import ICategoryRepo from "../../../domain/repositories/ICategoryRepo";
import categoryModel from "../../driven-adapters/MongoDB/models/category";

class CategoryRepo implements ICategoryRepo {
    async getAll(findArgs?: any): Promise<Category[]> {
        const categories: Category[] = await categoryModel.find(findArgs && findArgs).lean();
        return categories;
    }

    async findMany(findArgs?: Category, qty?: number): Promise<Category[]> {
        const categories: Category[] = await categoryModel.find(findArgs ?? {}).limit(qty ?? 0).lean();
        return categories;
    }

    async getById(id: string): Promise<Category | null> {
        const category: Category | null = await categoryModel.findOne({ uuid: id }).lean();
        return category;
    }

    async getOne(params: Category): Promise<Category | null> {
        const category: Category | null = await categoryModel.findOne(params).lean();
        return category;
    }

    async create(category: Category): Promise<Category> {
        const createdCategory: Category = await categoryModel.create(category);
        return createdCategory;
    }

    async update(category: Category): Promise<Category | null> {
        const updatedCategory = await categoryModel.findOneAndUpdate({ uuid: category.uuid }, 
            category, { new: true,  }).lean();
        return updatedCategory;
    }

    async delete(category: Category): Promise<Category | null> {
        const deletedCategory = await categoryModel.findOneAndUpdate({ uuid: category.uuid }, {
            $set: {
                status: "DELETED"
            }
        }, { new: true }).lean();
        return deletedCategory;
    }
}

export default CategoryRepo;