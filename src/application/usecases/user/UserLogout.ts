import InvalidTokenError from "../../../domain/exceptions/session/InvalidTokenError";
import IUserRepo from "../../../domain/repositories/IUserRepo";
import IAuthenticationRepo from "../../../domain/repositories/authentication/IAuthenticationRepo";

class UserLogout {
    private readonly userRepo: IUserRepo;
    private readonly authenticationRepo: IAuthenticationRepo;

    constructor(userRepo: IUserRepo, authenticationRepo: IAuthenticationRepo) {
        this.userRepo = userRepo;
        this.authenticationRepo = authenticationRepo;
    }

    async run(token: string): Promise<any> {
        const tokenData = this.authenticationRepo.getTokenData(token);
        const foundUser = await this.userRepo.getByUserName(tokenData.userName);
        if (foundUser) {
            let tokens = foundUser?.tokens?.filter(t => t !== token);
            foundUser.tokens = tokens;
            await this.userRepo.update(foundUser);
            return;
        }

        throw new InvalidTokenError();
    }
}

export default UserLogout;