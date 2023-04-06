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
const category_1 = __importDefault(require("../../driven-adapters/MongoDB/models/category"));
class CategoryRepo {
    getAll(findArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield category_1.default.find(findArgs && findArgs).lean();
            return categories;
        });
    }
    findMany(findArgs, qty) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield category_1.default.find(findArgs !== null && findArgs !== void 0 ? findArgs : {}).limit(qty !== null && qty !== void 0 ? qty : 0).lean();
            return categories;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_1.default.findOne({ uuid: id }).lean();
            return category;
        });
    }
    getOne(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_1.default.findOne(params).lean();
            return category;
        });
    }
    create(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdCategory = yield category_1.default.create(category);
            return createdCategory;
        });
    }
    update(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCategory = yield category_1.default.findOneAndUpdate({ uuid: category.uuid }, category, { new: true, }).lean();
            return updatedCategory;
        });
    }
    delete(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCategory = yield category_1.default.findOneAndUpdate({ uuid: category.uuid }, {
                $set: {
                    status: "DELETED"
                }
            }, { new: true }).lean();
            return deletedCategory;
        });
    }
}
exports.default = CategoryRepo;
