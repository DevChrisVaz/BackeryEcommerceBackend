class PasswordsNotMatchError extends Error {
    constructor() {
        super("Passwords don't match");
        this.name = "PasswordsNotMatch";
    }
}

export default PasswordsNotMatchError;