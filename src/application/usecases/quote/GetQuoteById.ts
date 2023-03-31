import Quote from "../../../domain/entities/quote";
import QuoteNotFoundError from "../../../domain/exceptions/quote/QuoteNotFoundError";
import IQuoteRepo from "../../../domain/repositories/IQuoteRepo";
import IDataEncryptionRepo from "../../../domain/repositories/encryption/IDataEncryptionRepo";

class GetQuoteById {
    private readonly quoteRepo: IQuoteRepo;
    private readonly dataEncryptionRepo: IDataEncryptionRepo;

    constructor(quoteRepo: IQuoteRepo, dataEncryptionRepo: IDataEncryptionRepo) {
        this.quoteRepo = quoteRepo;
        this.dataEncryptionRepo = dataEncryptionRepo;
    }

    async run(id: string): Promise<Quote> {
        const foundQuote: Quote | null = await this.quoteRepo.getById(id);

        if(foundQuote){
            foundQuote.address = this.dataEncryptionRepo.decrypt(foundQuote.address ?? "");
            foundQuote.city = this.dataEncryptionRepo.decrypt(foundQuote.city ?? "");
            foundQuote.zip = this.dataEncryptionRepo.decrypt(foundQuote.zip ?? "");
            return foundQuote;
        }

        throw new QuoteNotFoundError();

    }
}

export default GetQuoteById;