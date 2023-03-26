class UserNotFoundError extends Error {
    constructor() {
        super("User not found");
        this.name = "UserNotFound";
    }
}

export default UserNotFoundError;