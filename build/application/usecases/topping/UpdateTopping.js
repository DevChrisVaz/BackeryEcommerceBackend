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
const ToppingNotFoundError_1 = __importDefault(require("../../../domain/exceptions/topping/ToppingNotFoundError"));
class UpdateTopping {
    constructor(toppingRepo) {
        this.toppingRepo = toppingRepo;
    }
    run(id, topping) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundTopping = yield this.toppingRepo.getById(id);
            if (foundTopping) {
                const toppingToUpdate = Object.assign(Object.assign({}, foundTopping), topping);
                const updatedTopping = yield this.toppingRepo.update(toppingToUpdate);
                if (updatedTopping)
                    return updatedTopping;
            }
            throw new ToppingNotFoundError_1.default();
        });
    }
}
exports.default = UpdateTopping;
