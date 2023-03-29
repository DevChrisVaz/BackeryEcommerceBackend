class UserAlreadyCommentedError extends Error {
    constructor() {
        super("User already commented");
        this.name = "UserAlreadyCommented"
    }
}

export default UserAlreadyCommentedError;