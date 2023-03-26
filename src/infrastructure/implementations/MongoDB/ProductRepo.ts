import Product from "../../../domain/entities/product";
import IProductRepo from "../../../domain/repositories/IProductRepo";
import productModel from "../../driven-adapters/MongoDB/models/product";

class ProductRepo implements IProductRepo {
    async getAll(): Promise<Product[]> {
        const products: Product[] = await productModel.find().populate("categoryRef").populate("tagsRef").lean();
        return products;
    }
    // async getMany(): Promise<Product[]> {
    //     const products: Product[] = await productModel.find().populate("categoryRef").populate("tagsRef").lean();
    //     return products;
    // }
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
            product, { new: true,  }).lean();
        return updatedProduct;
    }
    async delete(product: Product): Promise<Product | null> {
        const deletedProduct = await productModel.findOneAndUpdate({ uuid: product.uuid },{
            $set: {
                status: "DELETED"
            }
        }, { new: true }).lean();
        return deletedProduct;   
    }

}

export default ProductRepo;