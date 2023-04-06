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
const uuid_1 = require("uuid");
class QuoteController {
    constructor(createQuoteUseCase, getQuoteByIdUseCase, getAllQuotesUseCase, updateQuoteUseCase, deleteQuoteUseCase) {
        this.getAllQuotes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const quotes = yield this.getAllQuotesUseCase.run();
                res.status(200).json(quotes);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.getQuoteById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const foundQuote = yield this.getQuoteByIdUseCase.run(id);
                res.status(200).json(foundQuote);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createQuote = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const quote = req.body;
            try {
                quote.uuid = (0, uuid_1.v4)();
                const createdQuote = yield this.createQuoteUseCase.run(quote);
                res.status(201).json(createdQuote);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.updateQuote = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const quote = req.body;
            try {
                const updatedQuote = yield this.updateQuoteUseCase.run(id, quote);
                res.status(200).json(updatedQuote);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteQuote = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedQuote = yield this.deleteQuoteUseCase.run(id);
                res.status(200).json(deletedQuote);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createQuoteUseCase = createQuoteUseCase,
            this.getQuoteByIdUseCase = getQuoteByIdUseCase,
            this.getAllQuotesUseCase = getAllQuotesUseCase,
            this.updateQuoteUseCase = updateQuoteUseCase,
            this.deleteQuoteUseCase = deleteQuoteUseCase;
    }
}
exports.default = QuoteController;
