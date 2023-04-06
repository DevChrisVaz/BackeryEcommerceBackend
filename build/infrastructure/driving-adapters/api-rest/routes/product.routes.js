"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateProduct_1 = __importDefault(require("../../../../application/usecases/product/CreateProduct"));
const DeleteProduct_1 = __importDefault(require("../../../../application/usecases/product/DeleteProduct"));
const GetAllProducts_1 = __importDefault(require("../../../../application/usecases/product/GetAllProducts"));
const GetProductById_1 = __importDefault(require("../../../../application/usecases/product/GetProductById"));
const GetRelatedProducts_1 = __importDefault(require("../../../../application/usecases/product/GetRelatedProducts"));
const IncreaseProductViews_1 = __importDefault(require("../../../../application/usecases/product/IncreaseProductViews"));
const UpdateProduct_1 = __importDefault(require("../../../../application/usecases/product/UpdateProduct"));
const FilesManager_1 = __importDefault(require("../../../implementations/FS/FilesManager"));
const ImageOptimizerRepo_1 = __importDefault(require("../../../implementations/Sharp/ImageOptimizerRepo"));
const ProductRepo_1 = __importDefault(require("../../../implementations/MongoDB/ProductRepo"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const GetMostVisitedProducts_1 = __importDefault(require("../../../../application/usecases/product/GetMostVisitedProducts"));
const GetManyProducts_1 = __importDefault(require("../../../../application/usecases/product/GetManyProducts"));
const authorizeUser_1 = require("../middlewares/user/authorizeUser");
const productRepo = new ProductRepo_1.default();
const filesManagerRepo = new FilesManager_1.default();
const imageOptimizerRepo = new ImageOptimizerRepo_1.default();
const getAllProducts = new GetAllProducts_1.default(productRepo);
const getManyProducts = new GetManyProducts_1.default(productRepo);
const getMostVisitedProducts = new GetMostVisitedProducts_1.default(productRepo);
const getProductById = new GetProductById_1.default(productRepo);
const createProduct = new CreateProduct_1.default(productRepo, filesManagerRepo, imageOptimizerRepo);
const updateProduct = new UpdateProduct_1.default(productRepo);
const deleteProduct = new DeleteProduct_1.default(productRepo);
const increateProductViews = new IncreaseProductViews_1.default(productRepo);
const getRelatedProducts = new GetRelatedProducts_1.default(productRepo);
const productController = new product_controller_1.default(createProduct, getProductById, getAllProducts, getManyProducts, getMostVisitedProducts, updateProduct, deleteProduct, increateProductViews, getRelatedProducts);
const productRouter = (0, express_1.Router)();
productRouter.route('/')
    .get(productController.getAllProducts)
    .post(authorizeUser_1.authorizeUser, productController.createProduct);
productRouter.route('/many')
    .get(productController.getManyProducts);
productRouter.route("/most-visited")
    .get(productController.getMostVisited);
productRouter.route('/:id')
    .get(productController.getProductById)
    .put(authorizeUser_1.authorizeUser, productController.updateProduct)
    .delete(authorizeUser_1.authorizeUser, productController.deleteProduct);
productRouter.route('/increase-views/:id')
    .put(productController.increaseProductViews);
productRouter.route('/related/:id')
    .get(productController.getRelatedProducts);
exports.default = productRouter;
