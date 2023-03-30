import FilterOptions from "../../../domain/entities/filterOptions";
import Product from "../../../domain/entities/product";
import ProductsWithTotal from "../../../domain/entities/productsWithTotal";
import IProductRepo from "../../../domain/repositories/IProductRepo";
import productModel from "../../driven-adapters/MongoDB/models/product";

class ProductRepo implements IProductRepo {
    async getAll(): Promise<Product[]> {
        const products: Product[] = await productModel.find().populate("categoryRef").populate("tagsRef").lean();
        return products;
    }
    async getMany(options: FilterOptions): Promise<ProductsWithTotal> {
        const { filters } = options;
        const skip = options.limit * (options.page - 1);

        let filter: any = { status: { $ne: "DELETED" } };
        if(filters) {
            const { category, searchBy } = filters;
            if(category) filter = { ...filter, category };
            if(searchBy) filter = { ...filter, name: { $regex: searchBy } }
        }

        const products: Product[] = await productModel.find(filter).skip(skip).limit(options.limit).populate("categoryRef").populate("tagsRef").lean();
        const total: number = await productModel.countDocuments(filter);
        return { products, total };
    }
    async getMostVisited(): Promise<Product[]> {
        const products: Product[] = await productModel.find().sort({ views: -1 }).limit(8).populate("categoryRef").populate("tagsRef").lean();
        return products;
    }
    async getById(id: string): Promise<Product | null> {
        const product: Product | null = await productModel.findOne({ uuid: id }).populate("categoryRef").populate("tagsRef").lean();
        return product;
    }
    async create(product: Product): Promise<Product> {
        const createdProduct: Product = await productModel.create(product);
        return createdProduct;
    }
    async update(product: Product): Promise<Product | null> {
        const updatedProduct = await productModel.findOneAndUpdate({ uuid: product.uuid },
            product, { new: true, }).lean();
        return updatedProduct;
    }
    async delete(product: Product): Promise<Product | null> {
        const deletedProduct = await productModel.findOneAndUpdate({ uuid: product.uuid }, {
            $set: {
                status: "DELETED"
            }
        }, { new: true }).lean();
        return deletedProduct;
    }

}

export default ProductRepo;