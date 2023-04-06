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
const quote_1 = __importDefault(require("../../driven-adapters/MongoDB/models/quote"));
class QuoteRepo {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const quotes = yield quote_1.default.find().lean();
            return quotes;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const quote = yield quote_1.default.findOne({ uuid: id }).populate("productsRef").lean();
            return quote;
        });
    }
    create(quote) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdQuote = yield quote_1.default.create(quote);
            return createdQuote;
        });
    }
    update(quote) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedInventory = yield quote_1.default.findOneAndUpdate({ uuid: quote.uuid }, quote, { new: true, }).lean();
            return updatedInventory;
        });
    }
    delete(quote) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedInventory = yield quote_1.default.findOneAndUpdate({ uuid: quote.uuid }, {
                $set: {
                    status: "DELETED"
                }
            }, { new: true }).lean();
            return deletedInventory;
        });
    }
}
exports.default = QuoteRepo;
