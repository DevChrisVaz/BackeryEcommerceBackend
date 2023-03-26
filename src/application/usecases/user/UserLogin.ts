import User from "../../../domain/entities/user";
import PasswordsNotMatchError from "../../../domain/exceptions/PasswordsNotMatchError";
import UserNotFoundError from "../../../domain/exceptions/user/UserNotFoundError";
import IAuthenticationRepo from "../../../domain/repositories/authentication/IAuthenticationRepo";
import IUserRepo from "../../../domain/repositories/IUserRepo";
import PasswordEncryptionRepo from "../../../infrastructure/implementations/Encryption/PasswordEncryptionRepo";
import dotenv from "dotenv";
import Tokens from "../../../domain/entities/tokens";

dotenv.config();

class UserLogin {
    private readonly userRepo: IUserRepo;
    private readonly passwordEncryptionRepo: PasswordEncryptionRepo;
    private readonly authenticationRepo: IAuthenticationRepo;
    private readonly accessTokenSecret: string;
    private readonly refreshTokenSecret: string;

    constructor(
        userRepo: IUserRepo, 
        passwordEncryptionRepo: PasswordEncryptionRepo, 
        authenticationRepo: IAuthenticationRepo
    ) {
        this.userRepo = userRepo;
        this.passwordEncryptionRepo = passwordEncryptionRepo;
        this.authenticationRepo = authenticationRepo;
        this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? "";
        this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? "";
    }

    async run(userName: string, password: string): Promise<Tokens> {
        const foundUser: User | null = await this.userRepo.getByUserName(userName);
        if(foundUser && foundUser.password) {
            if (await this.passwordEncryptionRepo.comparePassword(password, foundUser.password)) {
                const tokenData = {
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    profilePicture: foundUser.profilePicture,
                    userName: foundUser.userName
                }

                const refreshToken = this.authenticationRepo.generateToken(tokenData, "7d", this.refreshTokenSecret);
                foundUser.tokens && foundUser.tokens.push(refreshToken);
                await this.userRepo.update(foundUser);

                const accessToken = this.authenticationRepo.generateToken(tokenData, "60s", this.accessTokenSecret);
                return {
                    accessToken,
                    refreshToken
                };
            }

            throw new PasswordsNotMatchError();
        }

        throw new UserNotFoundError();
    }
}

export default UserLogin;