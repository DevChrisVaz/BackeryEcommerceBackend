import Product from "../../../domain/entities/product";
import ProductNotFoundError from "../../../domain/exceptions/product/ProductNotFoundError";
import IProductRepo from "../../../domain/repositories/IProductRepo";
import GetProductById from "./GetProductById";

class UpdateProduct {
    private readonly productRepo: IProductRepo;
    private readonly getProductById: GetProductById;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
        this.getProductById = new GetProductById(productRepo);
    }

    async run(id: string, product: Product): Promise<Product> {
        const foundProduct: Product | null = await this.getProductById.run(id);

        if (foundProduct) {
            const productToUpdate: Product = {
                ...foundProduct,
                ...product
            }

            const updatedProduct: Product | null = await this.productRepo.update(productToUpdate);

            if (updatedProduct) return updatedProduct;
        }

        throw new ProductNotFoundError();
    }
}

export default UpdateProduct;