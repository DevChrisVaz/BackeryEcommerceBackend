import IAuthenticationRepo from "../../../../domain/repositories/authentication/IAuthenticationRepo";
import jwt from "jsonwebtoken";

class AuthenticationRepo implements IAuthenticationRepo {
    generateToken(data: object, expiration: string, tokenSecret: string): string {
        const token: string = jwt.sign(data, tokenSecret, {
            expiresIn: expiration,
            // algorithm: "RS256"
        });

        return token;
    }

    validateToken(token: string, tokenSecret: string): boolean {
        throw new Error("Method not implemented.");
    }

}

export default AuthenticationRepo;