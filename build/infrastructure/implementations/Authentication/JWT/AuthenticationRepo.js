"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthenticationRepo {
    generateToken(data, expiration, tokenSecret) {
        const token = jsonwebtoken_1.default.sign(data, tokenSecret, {
            expiresIn: expiration,
            // algorithm: "RS256"
        });
        return token;
    }
    validateToken(token, tokenSecret) {
        let isValid = false;
        jsonwebtoken_1.default.verify(token, tokenSecret, (err, decoded) => {
            if (err) {
                isValid = false;
            }
            else {
                isValid = true;
            }
        });
        return isValid;
    }
    getTokenData(token) {
        const data = jsonwebtoken_1.default.decode(token);
        return data;
    }
}
exports.default = AuthenticationRepo;
