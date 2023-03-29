import Quote from "../../../domain/entities/quote";
import IQuoteRepo from "../../../domain/repositories/IQuoteRepo";

class GetAllQuotes {
    private readonly quoteRepo: IQuoteRepo;

    constructor(quoteRepo: IQuoteRepo) {
        this.quoteRepo = quoteRepo;
    }

    async run(): Promise<Quote[]> {
        let quotes: Quote[] = await this.quoteRepo.getAll();
        quotes = quotes.filter(i => i.status !== "DELETED");
        return quotes;
    }
}

export default GetAllQuotes;