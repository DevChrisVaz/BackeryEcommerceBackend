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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductNotFoundError_1 = __importDefault(require("../../../domain/exceptions/product/ProductNotFoundError"));
const GetProductById_1 = __importDefault(require("./GetProductById"));
class UpdateProduct {
    constructor(productRepo) {
        this.productRepo = productRepo;
        this.getProductById = new GetProductById_1.default(productRepo);
    }
    run(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundProduct = yield this.getProductById.run(id);
            if (foundProduct) {
                const productToUpdate = Object.assign(Object.assign({}, foundProduct), product);
                const updatedProduct = yield this.productRepo.update(productToUpdate);
                if (updatedProduct)
                    return updatedProduct;
            }
            throw new ProductNotFoundError_1.default();
        });
    }
}
exports.default = UpdateProduct;
