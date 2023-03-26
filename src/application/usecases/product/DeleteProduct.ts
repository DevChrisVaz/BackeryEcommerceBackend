import Product from "../../../domain/entities/product";
import ProductNotFoundError from "../../../domain/exceptions/product/ProductNotFoundError";
import IProductRepo from "../../../domain/repositories/IProductRepo";


class DeleteProduct {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(id: string): Promise<Product> {
        const foundProduct: Product | null = await this.productRepo.getById(id);

        if(foundProduct) {
            const deletedProduct = await this.productRepo.delete(foundProduct);

            if(deletedProduct) return deletedProduct;
        }

        throw new ProductNotFoundError();
    }
}

export default DeleteProduct;