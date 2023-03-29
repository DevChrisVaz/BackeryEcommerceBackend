import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import CreateQuote from "../../../../application/usecases/quote/CreateQuote";
import DeleteQuote from "../../../../application/usecases/quote/DeleteQuote";
import GetAllQuotes from "../../../../application/usecases/quote/GetAllQuotes";
import GetQuotesById from "../../../../application/usecases/quote/GetQuoteById";
import UpdateQuote from "../../../../application/usecases/quote/UpdateQuote";
import Quote from "../../../../domain/entities/quote";

class QuoteController {
    private readonly createQuoteUseCase: CreateQuote;
    private readonly getQuoteByIdUseCase: GetQuotesById;
    private readonly getAllQuotesUseCase: GetAllQuotes;
    private readonly updateQuoteUseCase: UpdateQuote;
    private readonly deleteQuoteUseCase: DeleteQuote;

    constructor(
        createQuoteUseCase: CreateQuote,
        getQuoteByIdUseCase: GetQuotesById,
        getAllQuotesUseCase: GetAllQuotes,
        updateQuoteUseCase: UpdateQuote,
        deleteQuoteUseCase: DeleteQuote
    ) {
        this.createQuoteUseCase = createQuoteUseCase,
        this.getQuoteByIdUseCase = getQuoteByIdUseCase,
        this.getAllQuotesUseCase = getAllQuotesUseCase,
        this.updateQuoteUseCase = updateQuoteUseCase,
        this.deleteQuoteUseCase = deleteQuoteUseCase
    }

    getAllQuotes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const quotes: Quote[] = await this.getAllQuotesUseCase.run();
            res.status(200).json(quotes);
            return;
        } catch(err) {
            next(err);
        }
    }

    getQuoteById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const foundQuote: Quote | null = await this.getQuoteByIdUseCase.run(id);
            res.status(200).json(foundQuote);
            return;
        } catch (err) {
            next(err);
        }
    }

    createQuote = async (req: Request, res: Response, next: NextFunction) => {
        const quote: Quote = req.body;
        try {
            quote.uuid = uuid();
            const createdQuote = await this.createQuoteUseCase.run(quote);
            res.status(201).json(createdQuote);
            return;
        } catch(err) {
            next(err);
        }
    }

    updateQuote = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const quote: Quote = req.body;
        
        try {
            const updatedQuote: Quote = await this.updateQuoteUseCase.run(id, quote);
            res.status(200).json(updatedQuote);
            return;
        } catch(err) {
            next(err);
        }
    }

    deleteQuote = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const deletedQuote: Quote = await this.deleteQuoteUseCase.run(id);
            res.status(200).json(deletedQuote);
            return;
        } catch(err) {
            next(err);
        }
    }
}

export default QuoteController;