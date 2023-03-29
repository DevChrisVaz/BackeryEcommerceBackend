class QuoteNotFoundError extends Error {
    constructor() {
        super("Cotización no encontrada");
        this.name = "QuoteNotFound";
    }
}

export default QuoteNotFoundError;