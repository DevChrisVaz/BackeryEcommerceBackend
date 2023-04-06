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
const topping_1 = __importDefault(require("../../driven-adapters/MongoDB/models/topping"));
class ToppingRepo {
    getAll(findArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const toppings = yield topping_1.default.find(findArgs && findArgs).lean();
            return toppings;
        });
    }
    findMany(findArgs, qty) {
        return __awaiter(this, void 0, void 0, function* () {
            const toppings = yield topping_1.default.find(findArgs !== null && findArgs !== void 0 ? findArgs : {}).limit(qty !== null && qty !== void 0 ? qty : 0).lean();
            return toppings;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const topping = yield topping_1.default.findOne({ uuid: id }).lean();
            return topping;
        });
    }
    findOne(findArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const topping = yield topping_1.default.findOne(findArgs).lean();
            return topping;
        });
    }
    getByUserName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const topping = yield topping_1.default.findOne({ userName }).lean();
            return topping;
        });
    }
    create(topping) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdTopping = yield topping_1.default.create(topping);
            return createdTopping;
        });
    }
    update(topping) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedTopping = yield topping_1.default.findOneAndUpdate({ uuid: topping.uuid }, topping, { new: true, }).lean();
            return updatedTopping;
        });
    }
    delete(topping) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedTopping = yield topping_1.default.findOneAndUpdate({ uuid: topping.uuid }, {
                $set: {
                    status: "DELETED"
                }
            }, { new: true }).lean();
            return deletedTopping;
        });
    }
}
exports.default = ToppingRepo;
