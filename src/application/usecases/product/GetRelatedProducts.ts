import Product from "../../../domain/entities/product";
import ProductNotFoundError from "../../../domain/exceptions/product/ProductNotFoundError";
import IProductRepo from "../../../domain/repositories/IProductRepo";

class GetRelatedProducts {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(id: string): Promise<Product[]> {
        const foundProduct: Product | null = await this.productRepo.getById(id);

        if(foundProduct) {
            const products: Product[] = await this.productRepo.getAll();
            const relatedProducts: Product[] = products.filter(p => {
                let matchProduct: Product | null = null;
                foundProduct.tags.every(t => {
                    if (p.tags.includes(t)) {
                        matchProduct = p;
                        return false;
                    }
                    return true;
                });
                if (matchProduct) return matchProduct;
                return false;
            });
            return relatedProducts.slice(0, 3);
        }

        throw new ProductNotFoundError();
    }
}

export default GetRelatedProducts;