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
class GetManyProducts {
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    run(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filters } = options;
            if (filters) {
                const { searchBy } = filters;
                if (searchBy && searchBy.length > 0) {
                    const regexStart = "\\b(";
                    let concated = "";
                    const regexEnd = ")\\b";
                    searchBy.forEach((e, index) => {
                        concated += e;
                        if (index !== searchBy.length - 1)
                            concated += "|";
                    });
                    filters.searchBy = new RegExp(regexStart + concated + regexEnd, "i");
                }
            }
            let productWithTotal = yield this.productRepo.getMany(options);
            return productWithTotal;
        });
    }
}
exports.default = GetManyProducts;
