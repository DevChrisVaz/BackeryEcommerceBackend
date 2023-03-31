class InvalidTokenError extends Error {
    constructor() {
        super("Invalid token");
        this.name = "InvalidTokenError"
    }
}

export default InvalidTokenError;