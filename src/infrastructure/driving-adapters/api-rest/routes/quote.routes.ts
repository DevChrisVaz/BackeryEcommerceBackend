import { Router } from "express";
import CreateQuote from "../../../../application/usecases/quote/CreateQuote";
import DeleteQuote from "../../../../application/usecases/quote/DeleteQuote";
import GetAllQuotes from "../../../../application/usecases/quote/GetAllQuotes";
import GetQuoteById from "../../../../application/usecases/quote/GetQuoteById";
import UpdateQuote from "../../../../application/usecases/quote/UpdateQuote";
import QuoteRepo from "../../../implementations/MongoDB/QuoteRepo";
import QuoteController from "../controllers/quote.controller";
import { authorizeUser } from "../middlewares/user/authorizeUser";
import DataEncryptionRepo from "../../../implementations/Crypto/DataEncryptionRepo";

const dataEncryptionRepo = new DataEncryptionRepo(
    process.env.ENCRYPTION_ALGORITHM || "",
    Buffer.from(process.env.KEY || "", "hex"),
    Buffer.from(process.env.SECRET_IV || "", "hex")
);
const quoteRepo = new QuoteRepo();
const getAllQuotes = new GetAllQuotes(quoteRepo);
const getQuoteById = new GetQuoteById(quoteRepo, dataEncryptionRepo);
const createQuote = new CreateQuote(quoteRepo, dataEncryptionRepo);
const updateQuote = new UpdateQuote(quoteRepo);
const deleteQuote = new DeleteQuote(quoteRepo);
const quoteController = new QuoteController(
    createQuote,
    getQuoteById,
    getAllQuotes,
    updateQuote,
    deleteQuote
)

const quoteRouter = Router();

quoteRouter.route('/')
    .get(authorizeUser, quoteController.getAllQuotes)
    .post(quoteController.createQuote);
quoteRouter.route('/:id')
    .get(authorizeUser, quoteController.getQuoteById)
    .put(authorizeUser, quoteController.updateQuote)
    .delete(authorizeUser, quoteController.deleteQuote);

export default quoteRouter;