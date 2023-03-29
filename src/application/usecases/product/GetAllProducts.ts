import FilterOptions from "../../../domain/entities/filterOptions";
import Product from "../../../domain/entities/product";
import IProductRepo from "../../../domain/repositories/IProductRepo";

class GetAllProducts {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(options: FilterOptions): Promise<Product[]> {
        let products: Product[] = await this.productRepo.getAll(options);
        products = products.filter(p => p.status !== "DELETED");
        return products;
    }
}

export default GetAllProducts;