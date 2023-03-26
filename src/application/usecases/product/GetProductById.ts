import Product from "../../../domain/entities/product";
import ProductNotFoundError from "../../../domain/exceptions/product/ProductNotFoundError";
import IProductRepo from "../../../domain/repositories/IProductRepo";

class GetProductById {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(id: string): Promise<Product | null> {
        const foundProduct: Product | null = await this.productRepo.getById(id);

        if(!foundProduct) throw new ProductNotFoundError();

        return foundProduct;
    }
}

export default GetProductById;