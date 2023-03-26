class UserAlreadyExistsError extends Error {
    constructor() {
        super("User already exists");
        this.name = "UserAlreadyExists";
    }
}

export default UserAlreadyExistsError;