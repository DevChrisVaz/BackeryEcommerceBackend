import Quote from "../../../domain/entities/quote";
import IQuoteRepo from "../../../domain/repositories/IQuoteRepo";
import IDataEncryptionRepo from "../../../domain/repositories/encryption/IDataEncryptionRepo";

class CreateQuote {
    private readonly quoteRepo: IQuoteRepo;
    private readonly dataEncryptionRepo: IDataEncryptionRepo;

    constructor(quoteRepo: IQuoteRepo, dataEncryptionRepo: IDataEncryptionRepo) {
        this.quoteRepo = quoteRepo;
        this.dataEncryptionRepo = dataEncryptionRepo;
    }

    async run(quote: Quote): Promise<Quote> {
        const quoteToCreate: Quote = {
            ...quote,
            address: this.dataEncryptionRepo.encrypt(quote.address ?? ""),
            city: this.dataEncryptionRepo.encrypt(quote.city ?? ""),
            zip: this.dataEncryptionRepo.encrypt(quote.zip ?? "")
        }
        const createdQuote: Quote = await this.quoteRepo.create(quoteToCreate);
        return createdQuote;
    }
}

export default CreateQuote;