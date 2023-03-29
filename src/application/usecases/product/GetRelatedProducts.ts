import FilterOptions from "../../../domain/entities/filterOptions";
import Product from "../../../domain/entities/product";
import ProductNotFoundError from "../../../domain/exceptions/product/ProductNotFoundError";
import IProductRepo from "../../../domain/repositories/IProductRepo";

class GetRelatedProducts {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(id: string, options: FilterOptions): Promise<Product[]> {
        const foundProduct: Product | null = await this.productRepo.getById(id);

        if(foundProduct) {
            const products: Product[] = await this.productRepo.getAll(options);
            const relatedProducts: Product[] = products.filter(p => {
                let matchProduct: Product | null = null;
                p.tags.every(t => {
                    if (p.tags.includes(t)) {
                        matchProduct = p;
                        return false;
                    }
                    return true;
                });
                if (matchProduct) return matchProduct;
                return false;
            });
            return relatedProducts;
        }

        throw new ProductNotFoundError();
    }
}

export default GetRelatedProducts;