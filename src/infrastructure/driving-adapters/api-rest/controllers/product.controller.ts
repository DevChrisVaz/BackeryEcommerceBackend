import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import CreateProduct from "../../../../application/usecases/product/CreateProduct";
import DeleteProduct from "../../../../application/usecases/product/DeleteProduct";
import GetAllProducts from "../../../../application/usecases/product/GetAllProducts";
import GetManyProducts from "../../../../application/usecases/product/GetManyProducts";
import GetMostVisitedProducts from "../../../../application/usecases/product/GetMostVisitedProducts";
import GetProductById from "../../../../application/usecases/product/GetProductById";
import GetRelatedProducts from "../../../../application/usecases/product/GetRelatedProducts";
import IncreaseProductViews from "../../../../application/usecases/product/IncreaseProductViews";
import UpdateProduct from "../../../../application/usecases/product/UpdateProduct";
import FilterOptions from "../../../../domain/entities/filterOptions";
import Product from "../../../../domain/entities/product";
import ProductsWithTotal from "../../../../domain/entities/productsWithTotal";

class ProductController {
    private readonly createProductUseCase: CreateProduct;
    private readonly getProductByIdUseCase: GetProductById;
    private readonly getAllProductsUseCase: GetAllProducts;
    private readonly getManyProductsUseCase: GetManyProducts;
    private readonly getMostVisitedProductsUseCase: GetMostVisitedProducts;
    private readonly updateProductUseCase: UpdateProduct;
    private readonly deleteProductUseCase: DeleteProduct;
    private readonly increaseProductViewsUseCase: IncreaseProductViews;
    private readonly getRelatedProductsUseCase: GetRelatedProducts;

    constructor(
        createProductUseCase: CreateProduct,
        getProductByIdUseCase: GetProductById,
        getAllProducts: GetAllProducts,
        getManyProductsUseCase: GetManyProducts,
        getMostVisitedProductsUseCase: GetMostVisitedProducts,
        updateProductUseCase: UpdateProduct,
        deleteProductUseCase: DeleteProduct,
        increaseProductViewsUseCase: IncreaseProductViews,
        getRelatedProductsUseCase: GetRelatedProducts
    ) {
        this.createProductUseCase = createProductUseCase;
        this.getProductByIdUseCase = getProductByIdUseCase;
        this.getAllProductsUseCase = getAllProducts;
        this.getManyProductsUseCase = getManyProductsUseCase;
        this.getMostVisitedProductsUseCase = getMostVisitedProductsUseCase;
        this.updateProductUseCase = updateProductUseCase;
        this.deleteProductUseCase = deleteProductUseCase;
        this.increaseProductViewsUseCase = increaseProductViewsUseCase;
        this.getRelatedProductsUseCase = getRelatedProductsUseCase;
    }

    getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products: Product[] = await this.getAllProductsUseCase.run();
            res.status(200).json(products);
            return;
        } catch (err) {
            next(err);
        }
    }

    getManyProducts = async (req: Request, res: Response, next: NextFunction) => {
        const { limit, page, category, searchBy } = req.query;
        let options: FilterOptions = {
            limit: limit ? parseInt(limit.toString()) : 12,
            page: page ? parseInt(page.toString()) : 1
        }
        if (category) options.filters = { ...options.filters, category: decodeURIComponent(category?.toString() ?? "") };
        if (searchBy) options.filters = { ...options.filters, searchBy: decodeURIComponent(searchBy?.toString() ?? "").split(" ") };
        try {
            const productsWithTotal: ProductsWithTotal = await this.getManyProductsUseCase.run(options);
            res.status(200).json(productsWithTotal);
            return;
        } catch (err) {
            next(err);
        }
    }

    getProductById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const foundProduct: Product | null = await this.getProductByIdUseCase.run(id);
            res.status(200).json(foundProduct);
            return;
        } catch (err) {
            next(err);
        }
    }

    createProduct = async (req: Request, res: Response, next: NextFunction) => {
        const product: Product = req.body;
        try {
            product.uuid = uuid();
            product.images = req.files;
            product.price = parseInt(req.body.price);
            product.tags = req.body.concatTags.split("/").slice(0, -1);
            const createdProduct = await this.createProductUseCase.run(product);
            res.status(201).json(createdProduct);
            return;
        } catch (err) {
            next(err);
        }
    }

    updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const product: Product = req.body;

        try {
            const updatedProduct: Product = await this.updateProductUseCase.run(id, product);
            res.status(200).json(updatedProduct);
            return;
        } catch (err) {
            next(err);
        }
    }

    deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const deletedProduct: Product = await this.deleteProductUseCase.run(id);
            res.status(200).json(deletedProduct);
            return;
        } catch (err) {
            next(err);
        }
    }

    increaseProductViews = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            await this.increaseProductViewsUseCase.run(id);
            res.status(200).send("Ok");
        } catch (err) {
            next(err);
        }
    }

    getRelatedProducts = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const relatedProducts: Product[] = await this.getRelatedProductsUseCase.run(id);
            res.status(200).json(relatedProducts);
        } catch (err) {
            next(err);
        }
    }

    getMostVisited = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const mostVisitedProducts = await this.getMostVisitedProductsUseCase.run();
            res.status(200).json(mostVisitedProducts);
        } catch (err) {
            next(err)
        }
    }
}

export default ProductController;