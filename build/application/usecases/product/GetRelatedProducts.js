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
class GetRelatedProducts {
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    run(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundProduct = yield this.productRepo.getById(id);
            if (foundProduct) {
                const products = yield this.productRepo.getAll();
                const relatedProducts = products.filter(p => {
                    let matchProduct = null;
                    foundProduct.tags.every(t => {
                        if (p.tags.includes(t)) {
                            matchProduct = p;
                            return false;
                        }
                        return true;
                    });
                    if (matchProduct)
                        return matchProduct;
                    return false;
                });
                return relatedProducts.slice(0, 3);
            }
            throw new ProductNotFoundError_1.default();
        });
    }
}
exports.default = GetRelatedProducts;
