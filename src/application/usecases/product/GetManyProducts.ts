import FilterOptions from "../../../domain/entities/filterOptions";
import ProductsWithTotal from "../../../domain/entities/productsWithTotal";
import IProductRepo from "../../../domain/repositories/IProductRepo";

class GetManyProducts {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(options: FilterOptions): Promise<ProductsWithTotal> {
        const { filters } = options;
        if(filters) {
            const { searchBy } = filters;
            if(searchBy && searchBy.length > 0) {
                const regexStart = "\\b(";
                let concated: string = "";
                const regexEnd = ")\\b";
                searchBy.forEach((e: any, index: number) => {
                    concated += e;
                    if(index !== searchBy.length - 1) concated += "|";
                });
                filters.searchBy = new RegExp(regexStart + concated + regexEnd, "i");
            }
        }
        let productWithTotal: ProductsWithTotal = await this.productRepo.getMany(options);
        return productWithTotal;
    }
}

export default GetManyProducts;