"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateQuote_1 = __importDefault(require("../../../../application/usecases/quote/CreateQuote"));
const DeleteQuote_1 = __importDefault(require("../../../../application/usecases/quote/DeleteQuote"));
const GetAllQuotes_1 = __importDefault(require("../../../../application/usecases/quote/GetAllQuotes"));
const GetQuoteById_1 = __importDefault(require("../../../../application/usecases/quote/GetQuoteById"));
const UpdateQuote_1 = __importDefault(require("../../../../application/usecases/quote/UpdateQuote"));
const QuoteRepo_1 = __importDefault(require("../../../implementations/MongoDB/QuoteRepo"));
const quote_controller_1 = __importDefault(require("../controllers/quote.controller"));
const authorizeUser_1 = require("../middlewares/user/authorizeUser");
const DataEncryptionRepo_1 = __importDefault(require("../../../implementations/Crypto/DataEncryptionRepo"));
const dataEncryptionRepo = new DataEncryptionRepo_1.default(process.env.ENCRYPTION_ALGORITHM || "", Buffer.from(process.env.KEY || "", "hex"), Buffer.from(process.env.SECRET_IV || "", "hex"));
const quoteRepo = new QuoteRepo_1.default();
const getAllQuotes = new GetAllQuotes_1.default(quoteRepo);
const getQuoteById = new GetQuoteById_1.default(quoteRepo, dataEncryptionRepo);
const createQuote = new CreateQuote_1.default(quoteRepo, dataEncryptionRepo);
const updateQuote = new UpdateQuote_1.default(quoteRepo);
const deleteQuote = new DeleteQuote_1.default(quoteRepo);
const quoteController = new quote_controller_1.default(createQuote, getQuoteById, getAllQuotes, updateQuote, deleteQuote);
const quoteRouter = (0, express_1.Router)();
quoteRouter.route('/')
    .get(quoteController.getAllQuotes)
    .post(quoteController.createQuote);
quoteRouter.route('/:id')
    .get(quoteController.getQuoteById)
    .put(authorizeUser_1.authorizeUser, quoteController.updateQuote)
    .delete(authorizeUser_1.authorizeUser, quoteController.deleteQuote);
exports.default = quoteRouter;
