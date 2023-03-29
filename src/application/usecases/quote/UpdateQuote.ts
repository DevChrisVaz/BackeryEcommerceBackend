import Quote from "../../../domain/entities/quote";
import QuoteNotFoundError from "../../../domain/exceptions/quote/QuoteNotFoundError";
import IQuoteRepo from "../../../domain/repositories/IQuoteRepo";

class UpdateQuote {
    private readonly quoteRepo: IQuoteRepo;

    constructor(quoteRepo: IQuoteRepo) {
        this.quoteRepo = quoteRepo;
    }

    async run(id: string, quote: Quote): Promise<Quote> {
        const foundQuote: Quote | null = await this.quoteRepo.getById(id);

        if (foundQuote) {
            const quoteToUpdate: Quote = {
                ...foundQuote,
                ...quote
            }

            const updatedQuote: Quote | null = await this.quoteRepo.update(quoteToUpdate);

            if (updatedQuote) return updatedQuote;
        }

        throw new QuoteNotFoundError();
    }
}

export default UpdateQuote;