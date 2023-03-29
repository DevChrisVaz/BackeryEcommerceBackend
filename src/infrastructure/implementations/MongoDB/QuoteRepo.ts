import Quote from "../../../domain/entities/quote";
import IQuoteRepo from "../../../domain/repositories/IQuoteRepo";
import quoteModel from "../../driven-adapters/MongoDB/models/quote";

class QuoteRepo implements IQuoteRepo {
    async getAll(): Promise<Quote[]> {
        const quotes: Quote[] = await quoteModel.find().lean();
        return quotes;
    }
    async getById(id: string): Promise<Quote | null> {
        const quote: Quote | null = await quoteModel.findOne({ uuid: id }).populate("productsRef").lean();
        return quote;
    }
    async create(quote: Quote): Promise<Quote> {
        const createdQuote: Quote = await quoteModel.create(quote);
        return createdQuote;
    }
    async update(quote: Quote): Promise<Quote | null> {
        const updatedInventory = await quoteModel.findOneAndUpdate({ uuid: quote.uuid }, 
            quote, { new: true,  }).lean();
        return updatedInventory;
    }
    async delete(quote: Quote): Promise<Quote | null> {
        const deletedInventory = await quoteModel.findOneAndUpdate({ uuid: quote.uuid }, {
            $set: {
                status: "DELETED"
            }
        }, { new: true }).lean();
        return deletedInventory;
    }

}

export default QuoteRepo;