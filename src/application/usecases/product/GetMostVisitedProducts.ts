import FilterOptions from "../../../domain/entities/filterOptions";
import Product from "../../../domain/entities/product";
import IProductRepo from "../../../domain/repositories/IProductRepo";

class GetMostVisitedProducts {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(): Promise<Product[]> {
        let products: Product[] = await this.productRepo.getMostVisited();
        products = products.filter(p => p.status !== "DELETED");
        return products;
    }
}

export default GetMostVisitedProducts;