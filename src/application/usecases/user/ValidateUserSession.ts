import IUserRepo from "../../../domain/repositories/IUserRepo";
import IAuthenticationRepo from "../../../domain/repositories/authentication/IAuthenticationRepo";

class ValidateUserSession {
    private readonly userRepo: IUserRepo;
    private readonly authenticationRepo: IAuthenticationRepo;
    private readonly accessTokenSecret: string;

    constructor(userRepo: IUserRepo, authenticationRepo: IAuthenticationRepo) {
        this.userRepo = userRepo;
        this.authenticationRepo = authenticationRepo;
        this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "";
    }

    async run(token: string): Promise<boolean> {
        const isValid = this.authenticationRepo.validateToken(token, this.accessTokenSecret);
        return isValid;
    }
}

export default ValidateUserSession;