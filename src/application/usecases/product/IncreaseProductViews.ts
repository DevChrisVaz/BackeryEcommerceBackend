import Product from "../../../domain/entities/product";
import ProductNotFoundError from "../../../domain/exceptions/product/ProductNotFoundError";
import IProductRepo from "../../../domain/repositories/IProductRepo";

class IncreaseProductViews {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(id: string): Promise<void> {
        const foundProduct: Product | null= await this.productRepo.getById(id);
        if(!foundProduct) throw new ProductNotFoundError();
        if(foundProduct.views) foundProduct.views = foundProduct.views + 1;
        else foundProduct.views = 1;
        await this.productRepo.update(foundProduct);
        return;
    }
}

export default IncreaseProductViews;