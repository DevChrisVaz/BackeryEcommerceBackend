class ToppingTypeAlreadyExistsError extends Error {
    constructor() {
        super("Topping type already exists");
        this.name = "ToppingTypeAlreadyExists"
    }
}

export default ToppingTypeAlreadyExistsError;