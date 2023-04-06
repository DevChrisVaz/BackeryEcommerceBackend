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
const ToppingTypeAlreadyExistsError_1 = __importDefault(require("../../../domain/exceptions/topping-type/ToppingTypeAlreadyExistsError"));
class CreateToppingType {
    constructor(toppingTypeRepo) {
        this.toppingTypeRepo = toppingTypeRepo;
    }
    run(toppingType) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundToppingType = yield this.toppingTypeRepo.getOne({ name: toppingType.name });
            if (foundToppingType)
                throw new ToppingTypeAlreadyExistsError_1.default();
            const createdToppingType = yield this.toppingTypeRepo.create(toppingType);
            return createdToppingType;
        });
    }
}
exports.default = CreateToppingType;
