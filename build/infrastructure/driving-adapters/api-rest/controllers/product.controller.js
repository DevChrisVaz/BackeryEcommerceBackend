"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class ProductController {
    constructor(createProductUseCase, getProductByIdUseCase, getAllProducts, getManyProductsUseCase, getMostVisitedProductsUseCase, updateProductUseCase, deleteProductUseCase, increaseProductViewsUseCase, getRelatedProductsUseCase) {
        this.getAllProducts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.getAllProductsUseCase.run();
                res.status(200).json(products);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.getManyProducts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { limit, page, category, searchBy } = req.query;
            let options = {
                limit: limit ? parseInt(limit.toString()) : 12,
                page: page ? parseInt(page.toString()) : 1
            };
            if (category)
                options.filters = Object.assign(Object.assign({}, options.filters), { category: decodeURIComponent((_a = category === null || category === void 0 ? void 0 : category.toString()) !== null && _a !== void 0 ? _a : "") });
            if (searchBy)
                options.filters = Object.assign(Object.assign({}, options.filters), { searchBy: decodeURIComponent((_b = searchBy === null || searchBy === void 0 ? void 0 : searchBy.toString()) !== null && _b !== void 0 ? _b : "").split(" ") });
            try {
                const productsWithTotal = yield this.getManyProductsUseCase.run(options);
                res.status(200).json(productsWithTotal);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.getProductById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const foundProduct = yield this.getProductByIdUseCase.run(id);
                res.status(200).json(foundProduct);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const product = req.body;
            try {
                product.uuid = (0, uuid_1.v4)();
                product.images = req.files;
                product.price = parseInt(req.body.price);
                product.tags = req.body.concatTags.split("/").slice(0, -1);
                const createdProduct = yield this.createProductUseCase.run(product);
                res.status(201).json(createdProduct);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.updateProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = req.body;
            try {
                const updatedProduct = yield this.updateProductUseCase.run(id, product);
                res.status(200).json(updatedProduct);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteProduct = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedProduct = yield this.deleteProductUseCase.run(id);
                res.status(200).json(deletedProduct);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.increaseProductViews = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.increaseProductViewsUseCase.run(id);
                res.status(200).send("Ok");
            }
            catch (err) {
                next(err);
            }
        });
        this.getRelatedProducts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const relatedProducts = yield this.getRelatedProductsUseCase.run(id);
                res.status(200).json(relatedProducts);
            }
            catch (err) {
                next(err);
            }
        });
        this.getMostVisited = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const mostVisitedProducts = yield this.getMostVisitedProductsUseCase.run();
                res.status(200).json(mostVisitedProducts);
            }
            catch (err) {
                next(err);
            }
        });
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
}
exports.default = ProductController;
