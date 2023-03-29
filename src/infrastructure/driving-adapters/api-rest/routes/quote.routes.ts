import { Router } from "express";
import CreateQuote from "../../../../application/usecases/quote/CreateQuote";
import DeleteQuote from "../../../../application/usecases/quote/DeleteQuote";
import GetAllQuotes from "../../../../application/usecases/quote/GetAllQuotes";
import GetQuoteById from "../../../../application/usecases/quote/GetQuoteById";
import UpdateQuote from "../../../../application/usecases/quote/UpdateQuote";
import QuoteRepo from "../../../implementations/MongoDB/QuoteRepo";
import QuoteController from "../controllers/quote.controller";

const quoteRepo = new QuoteRepo();
const getAllQuotes = new GetAllQuotes(quoteRepo);
const getQuoteById = new GetQuoteById(quoteRepo);
const createQuote = new CreateQuote(quoteRepo);
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
    .get(quoteController.getAllQuotes)
    .post(quoteController.createQuote);
quoteRouter.route('/:id')
    .get(quoteController.getQuoteById)
    .put(quoteController.updateQuote)
    .delete(quoteController.deleteQuote);

export default quoteRouter;