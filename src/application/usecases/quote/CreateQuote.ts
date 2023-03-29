import Quote from "../../../domain/entities/quote";
import IQuoteRepo from "../../../domain/repositories/IQuoteRepo";

class CreateQuote {
    private readonly quoteRepo: IQuoteRepo;

    constructor(quoteRepo: IQuoteRepo) {
        this.quoteRepo = quoteRepo;
    }

    async run(quote: Quote): Promise<Quote> {
        const createdQuote: Quote = await this.quoteRepo.create(quote);
        return createdQuote;
    }
}

export default CreateQuote;