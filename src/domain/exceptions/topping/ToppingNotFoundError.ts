class ToppingNotFoundError extends Error {
    constructor() {
        super("Topping not found");
        this.name = "ToppingNotFound";
    }
}

export default ToppingNotFoundError;