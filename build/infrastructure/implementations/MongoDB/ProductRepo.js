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
const product_1 = __importDefault(require("../../driven-adapters/MongoDB/models/product"));
class ProductRepo {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_1.default.find().populate("categoryRef").populate("tagsRef").lean();
            return products;
        });
    }
    getMany(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filters } = options;
            const skip = options.limit * (options.page - 1);
            let filter = { status: { $ne: "DELETED" } };
            if (filters) {
                const { category, searchBy } = filters;
                if (category)
                    filter = Object.assign(Object.assign({}, filter), { category });
                if (searchBy)
                    filter = Object.assign(Object.assign({}, filter), { name: { $regex: searchBy } });
            }
            const products = yield product_1.default.find(filter).skip(skip).limit(options.limit).populate("categoryRef").populate("tagsRef").lean();
            const total = yield product_1.default.countDocuments(filter);
            return { products, total };
        });
    }
    getMostVisited() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_1.default.find().sort({ views: -1 }).limit(8).populate("categoryRef").populate("tagsRef").lean();
            return products;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.default.findOne({ uuid: id }).populate("categoryRef").populate("tagsRef").lean();
            return product;
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdProduct = yield product_1.default.create(product);
            return createdProduct;
        });
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield product_1.default.findOneAndUpdate({ uuid: product.uuid }, product, { new: true, }).lean();
            return updatedProduct;
        });
    }
    delete(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProduct = yield product_1.default.findOneAndUpdate({ uuid: product.uuid }, {
                $set: {
                    status: "DELETED"
                }
            }, { new: true }).lean();
            return deletedProduct;
        });
    }
}
exports.default = ProductRepo;
