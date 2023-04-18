import Tokens from "../../../domain/entities/tokens";
import User from "../../../domain/entities/user";
import InvalidTokenError from "../../../domain/exceptions/session/InvalidTokenError";
import IUserRepo from "../../../domain/repositories/IUserRepo"
import IAuthenticationRepo from "../../../domain/repositories/authentication/IAuthenticationRepo";

class RefreshUserSession {
    private readonly userRepo: IUserRepo;
    private readonly authenticationRepo: IAuthenticationRepo;
    private readonly accessTokenSecret: string;
    private readonly refreshTokenSecret: string;

    constructor(userRepo: IUserRepo, authenticationRepo: IAuthenticationRepo) {
        this.userRepo = userRepo;
        this.authenticationRepo = authenticationRepo;
        this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "";
        this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? "";
    }

    async run(token: string): Promise<Tokens> {
        const refreshTokenData = this.authenticationRepo.getTokenData(token);

        if (refreshTokenData.userName) {
            const foundUser: User | null = await this.userRepo.getByUserName(refreshTokenData.userName);

            if (foundUser) {
                let tokens = foundUser.tokens;

                if(tokens?.includes(token)) {
                    const tokenData = {
                        firstName: foundUser.firstName,
                        lastName: foundUser.lastName,
                        profilePicture: foundUser.profilePicture,
                        userName: foundUser.userName
                    }
                    tokens = tokens.filter(t => t !== token);
                    const refreshToken = this.authenticationRepo.generateToken(tokenData, "7d", this.refreshTokenSecret);
                    tokens.push(refreshToken);
                    foundUser.tokens = tokens;
                    await this.userRepo.update(foundUser);
                    const accessToken = this.authenticationRepo.generateToken(tokenData, "10s", this.accessTokenSecret);
                    return {
                        accessToken,
                        refreshToken
                    };
                }

                throw new InvalidTokenError();
            }

            throw new InvalidTokenError();
        }
        
        throw new InvalidTokenError();
    }
}

export default RefreshUserSession