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
class UpdateQuote {
    constructor(quoteRepo) {
        this.quoteRepo = quoteRepo;
    }
    run(id, quote) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundQuote = yield this.quoteRepo.getById(id);
            if (foundQuote) {
                const quoteToUpdate = Object.assign(Object.assign({}, foundQuote), quote);
                const updatedQuote = yield this.quoteRepo.update(quoteToUpdate);
                if (updatedQuote)
                    return updatedQuote;
            }
            throw new QuoteNotFoundError_1.default();
        });
    }
}
exports.default = UpdateQuote;
