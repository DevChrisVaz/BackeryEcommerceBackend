import Quote from "../../../domain/entities/quote";
import QuoteNotFoundError from "../../../domain/exceptions/quote/QuoteNotFoundError";
import IQuoteRepo from "../../../domain/repositories/IQuoteRepo";

class GetQuoteById {
    private readonly quoteRepo: IQuoteRepo;

    constructor(quoteRepo: IQuoteRepo) {
        this.quoteRepo = quoteRepo;
    }

    async run(id: string): Promise<Quote> {
        const foundQuote: Quote | null = await this.quoteRepo.getById(id);

        if(!foundQuote) throw new QuoteNotFoundError();

        return foundQuote;
    }
}

export default GetQuoteById;