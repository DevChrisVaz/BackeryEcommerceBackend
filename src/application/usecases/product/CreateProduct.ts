import Product from "../../../domain/entities/product";
import IFilesManagerRepo from "../../../domain/repositories/files-manager/IFilesManagerRepo";
import IProductRepo from "../../../domain/repositories/IProductRepo";
import path from "path";
import IImageOptimizerRepo from "../../../domain/repositories/image-optimization/IImageOptimizerRepo";

class CreateProduct {
    private readonly productRepo: IProductRepo;
    private readonly filesManagerRepo: IFilesManagerRepo;
    private readonly imageOptimizerRepo: IImageOptimizerRepo;
    private readonly productImagePath: string;
    private readonly productImageStaticPath: string;

    constructor(
        productRepo: IProductRepo,
        filesManagerRepo: IFilesManagerRepo,
        imageOptimizerRepo: IImageOptimizerRepo
    ) {
        this.productRepo = productRepo;
        this.filesManagerRepo = filesManagerRepo;
        this.imageOptimizerRepo = imageOptimizerRepo;
        this.productImagePath = "public/img/products/";
        this.productImageStaticPath = "img/products";
    }

    async run(product: Product): Promise<Product> {
        let imagesPaths: any = [];
        if(Object.keys(product.images).length > 0) {
            if(!this.filesManagerRepo.exists(this.productImagePath)) {
                this.filesManagerRepo.createFolder(this.productImagePath, true);
            }

            Object.keys(product.images as (keyof typeof product.images)[]).forEach((key, index) => {
                let fileName = product.uuid + "_" + index + ".webp";

                this.imageOptimizerRepo.optimizeProductImage(product.images[key].data, 1024, this.productImagePath, fileName);
                imagesPaths.push(this.productImageStaticPath + "/" + fileName);
            })

        }

        product.images = imagesPaths;
        const createdProduct: Product = await this.productRepo.create(product);
        return createdProduct;
    }
}

export default CreateProduct;