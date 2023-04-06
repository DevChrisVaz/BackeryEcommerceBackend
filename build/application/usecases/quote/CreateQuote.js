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
class CreateQuote {
    constructor(quoteRepo, dataEncryptionRepo) {
        this.quoteRepo = quoteRepo;
        this.dataEncryptionRepo = dataEncryptionRepo;
    }
    run(quote) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const quoteToCreate = Object.assign(Object.assign({}, quote), { address: this.dataEncryptionRepo.encrypt((_a = quote.address) !== null && _a !== void 0 ? _a : ""), city: this.dataEncryptionRepo.encrypt((_b = quote.city) !== null && _b !== void 0 ? _b : ""), zip: this.dataEncryptionRepo.encrypt((_c = quote.zip) !== null && _c !== void 0 ? _c : "") });
            const createdQuote = yield this.quoteRepo.create(quoteToCreate);
            return createdQuote;
        });
    }
}
exports.default = CreateQuote;
