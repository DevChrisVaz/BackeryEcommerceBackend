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
class CreateProduct {
    constructor(productRepo, filesManagerRepo, imageOptimizerRepo) {
        this.productRepo = productRepo;
        this.filesManagerRepo = filesManagerRepo;
        this.imageOptimizerRepo = imageOptimizerRepo;
        this.productImagePath = "public/img/products/";
        this.productImageStaticPath = "img/products";
    }
    run(product) {
        return __awaiter(this, void 0, void 0, function* () {
            let imagesPaths = [];
            if (Object.keys(product.images).length > 0) {
                if (!this.filesManagerRepo.exists(this.productImagePath)) {
                    this.filesManagerRepo.createFolder(this.productImagePath, true);
                }
                Object.keys(product.images).forEach((key, index) => {
                    let fileName = product.uuid + "_" + index + ".webp";
                    this.imageOptimizerRepo.optimizeProductImage(product.images[key].data, 1024, this.productImagePath, fileName);
                    imagesPaths.push(this.productImageStaticPath + "/" + fileName);
                });
            }
            product.images = imagesPaths;
            const createdProduct = yield this.productRepo.create(product);
            return createdProduct;
        });
    }
}
exports.default = CreateProduct;
