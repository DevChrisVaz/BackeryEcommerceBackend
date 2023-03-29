import Quote from "../entities/quote";

interface IQuoteRepo {
    getAll(): Promise<Quote[]>;
    getById(id: string): Promise<Quote | null>;
    create(quote: Quote): Promise<Quote>;
    update(quote: Quote): Promise<Quote | null>;
    delete(quote: Quote): Promise<Quote | null>;
}

export default IQuoteRepo;