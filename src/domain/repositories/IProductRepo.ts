import FilterOptions from "../entities/filterOptions";
import Product from "../entities/product";
import ProductsWithTotal from "../entities/productsWithTotal";

interface IProductRepo {
    getAll(): Promise<Product[]>;
    getMostVisited(): Promise<Product[]>;
    getMany(options: FilterOptions): Promise<ProductsWithTotal>;
    getById(id: string): Promise<Product | null>;
    create(product: Product): Promise<Product>;
    update(product: Product): Promise<Product | null>;
    delete(product: Product): Promise<Product | null>;
}

export default IProductRepo;