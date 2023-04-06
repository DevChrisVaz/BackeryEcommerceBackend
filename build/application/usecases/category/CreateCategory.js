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
class CreateCategory {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    run(category) {
        return __awaiter(this, void 0, void 0, function* () {
            let foundCategory = yield this.categoryRepo.getOne({ name: category.name, type: category.type });
            if (foundCategory) {
                foundCategory = Object.assign(Object.assign(Object.assign({}, foundCategory), category), { status: "ACTIVE" });
            }
            ;
            const createdCategory = yield this.categoryRepo.create(category);
            return createdCategory;
        });
    }
}
exports.default = CreateCategory;
