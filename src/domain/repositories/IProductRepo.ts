import Product from "../entities/product";

interface IProductRepo {
    getAll(): Promise<Product[]>;
    // getMany(params: any): Promise<Product[]>;
    getById(id: string): Promise<Product | null>;
    create(product: Product): Promise<Product>;
    update(product: Product): Promise<Product | null>;
    delete(product: Product): Promise<Product | null>;
}

export default IProductRepo;