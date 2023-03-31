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
        let isValid = false;
        jwt.verify(token, tokenSecret, (err, decoded) => {
            if(err) {
                isValid = false;
            } else {
                isValid = true;
            }
        });
        return isValid;
    }

    getTokenData(token: string): any {
        const data: any = jwt.decode(token);
        return data;
    }
}

export default AuthenticationRepo;