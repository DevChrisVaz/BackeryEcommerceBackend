import { Router } from "express";
import CreateProduct from "../../../../application/usecases/product/CreateProduct";
import DeleteProduct from "../../../../application/usecases/product/DeleteProduct";
import GetAllProducts from "../../../../application/usecases/product/GetAllProducts";
import GetProductById from "../../../../application/usecases/product/GetProductById";
import GetRelatedProducts from "../../../../application/usecases/product/GetRelatedProducts";
import IncreaseProductViews from "../../../../application/usecases/product/IncreaseProductViews";
import UpdateProduct from "../../../../application/usecases/product/UpdateProduct";
import FilesManagerRepo from "../../../implementations/FS/FilesManager";
import ImageOptimizerRepo from "../../../implementations/Sharp/ImageOptimizerRepo";
import ProductRepo from "../../../implementations/MongoDB/ProductRepo";
import ProductController from "../controllers/product.controller";
import GetMostVisitedProducts from "../../../../application/usecases/product/GetMostVisitedProducts";
import GetManyProducts from "../../../../application/usecases/product/GetManyProducts";

const productRepo = new ProductRepo();
const filesManagerRepo = new FilesManagerRepo();
const imageOptimizerRepo = new ImageOptimizerRepo();
const getAllProducts = new GetAllProducts(productRepo);
const getManyProducts = new GetManyProducts(productRepo);
const getMostVisitedProducts = new GetMostVisitedProducts(productRepo);
const getProductById = new GetProductById(productRepo);
const createProduct = new CreateProduct(productRepo, filesManagerRepo, imageOptimizerRepo);
const updateProduct = new UpdateProduct(productRepo);
const deleteProduct = new DeleteProduct(productRepo);
const increateProductViews = new IncreaseProductViews(productRepo);
const getRelatedProducts = new GetRelatedProducts(productRepo);

const productController = new ProductController(
    createProduct,
    getProductById,
    getAllProducts,
    getManyProducts,
    getMostVisitedProducts,
    updateProduct,
    deleteProduct,
    increateProductViews,
    getRelatedProducts
)

const productRouter = Router();

productRouter.route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct);
productRouter.route('/many')
    .get(productController.getManyProducts);
productRouter.route("/most-visited")
    .get(productController.getMostVisited);
productRouter.route('/:id')
    .get(productController.getProductById)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);
productRouter.route('/increase-views/:id')
    .put(productController.increaseProductViews);
productRouter.route('/related/:id')
    .get(productController.getRelatedProducts);

export default productRouter;