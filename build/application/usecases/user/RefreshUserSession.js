"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidTokenError_1 = __importDefault(require("../../../domain/exceptions/session/InvalidTokenError"));
class RefreshUserSession {
    constructor(userRepo, authenticationRepo) {
        var _a, _b;
        this.userRepo = userRepo;
        this.authenticationRepo = authenticationRepo;
        this.accessTokenSecret = (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : "";
        this.refreshTokenSecret = (_b = process.env.REFRESH_TOKEN_SECRET) !== null && _b !== void 0 ? _b : "";
    }
    run(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshTokenData = this.authenticationRepo.getTokenData(token);
            if (refreshTokenData.userName) {
                const foundUser = yield this.userRepo.getByUserName(refreshTokenData.userName);
                if (foundUser) {
                    let tokens = foundUser.tokens;
                    if (tokens === null || tokens === void 0 ? void 0 : tokens.includes(token)) {
                        const tokenData = {
                            firstName: foundUser.firstName,
                            lastName: foundUser.lastName,
                            profilePicture: foundUser.profilePicture,
                            userName: foundUser.userName
                        };
                        tokens = tokens.filter(t => t !== token);
                        const refreshToken = this.authenticationRepo.generateToken(tokenData, "7d", this.refreshTokenSecret);
                        tokens.push(refreshToken);
                        foundUser.tokens = tokens;
                        yield this.userRepo.update(foundUser);
                        const accessToken = this.authenticationRepo.generateToken(tokenData, "30m", this.accessTokenSecret);
                        return {
                            accessToken,
                            refreshToken
                        };
                    }
                    throw new InvalidTokenError_1.default();
                }
                throw new InvalidTokenError_1.default();
            }
            throw new InvalidTokenError_1.default();
        });
    }
}
exports.default = RefreshUserSession;
