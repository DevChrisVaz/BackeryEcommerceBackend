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
const QuoteNotFoundError_1 = __importDefault(require("../../../domain/exceptions/quote/QuoteNotFoundError"));
class GetQuoteById {
    constructor(quoteRepo, dataEncryptionRepo) {
        this.quoteRepo = quoteRepo;
        this.dataEncryptionRepo = dataEncryptionRepo;
    }
    run(id) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const foundQuote = yield this.quoteRepo.getById(id);
            if (foundQuote) {
                foundQuote.address = this.dataEncryptionRepo.decrypt((_a = foundQuote.address) !== null && _a !== void 0 ? _a : "");
                foundQuote.city = this.dataEncryptionRepo.decrypt((_b = foundQuote.city) !== null && _b !== void 0 ? _b : "");
                foundQuote.zip = this.dataEncryptionRepo.decrypt((_c = foundQuote.zip) !== null && _c !== void 0 ? _c : "");
                return foundQuote;
            }
            throw new QuoteNotFoundError_1.default();
        });
    }
}
exports.default = GetQuoteById;
