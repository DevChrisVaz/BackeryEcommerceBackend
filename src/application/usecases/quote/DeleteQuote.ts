import Quote from "../../../domain/entities/quote";
import QuoteNotFoundError from "../../../domain/exceptions/quote/QuoteNotFoundError";
import IQuoteRepo from "../../../domain/repositories/IQuoteRepo";

class DeleteQuote {
    private readonly quoteRepo: IQuoteRepo;

    constructor(quoteRepo: IQuoteRepo) {
        this.quoteRepo = quoteRepo;
    }

    async run(id: string): Promise<Quote> {
        const foundQuote: Quote | null = await this.quoteRepo.getById(id);

        if(foundQuote) {
            const deletedInventory = await this.quoteRepo.delete(foundQuote);
            if (deletedInventory) return deletedInventory;
        }

        throw new QuoteNotFoundError();
    }
}

export default DeleteQuote;