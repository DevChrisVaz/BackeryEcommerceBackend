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
const PasswordsNotMatchError_1 = __importDefault(require("../../../domain/exceptions/PasswordsNotMatchError"));
const UserNotFoundError_1 = __importDefault(require("../../../domain/exceptions/user/UserNotFoundError"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserLogin {
    constructor(userRepo, passwordEncryptionRepo, authenticationRepo) {
        var _a, _b;
        this.userRepo = userRepo;
        this.passwordEncryptionRepo = passwordEncryptionRepo;
        this.authenticationRepo = authenticationRepo;
        this.accessTokenSecret = (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : "";
        this.refreshTokenSecret = (_b = process.env.REFRESH_TOKEN_SECRET) !== null && _b !== void 0 ? _b : "";
    }
    run(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.userRepo.getByUserName(userName);
            if (foundUser && foundUser.password) {
                if (yield this.passwordEncryptionRepo.comparePassword(password, foundUser.password)) {
                    const tokenData = {
                        firstName: foundUser.firstName,
                        lastName: foundUser.lastName,
                        profilePicture: foundUser.profilePicture,
                        userName: foundUser.userName
                    };
                    const refreshToken = this.authenticationRepo.generateToken(tokenData, "7d", this.refreshTokenSecret);
                    foundUser.tokens && foundUser.tokens.push(refreshToken);
                    yield this.userRepo.update(foundUser);
                    const accessToken = this.authenticationRepo.generateToken(tokenData, "5m", this.accessTokenSecret);
                    return {
                        accessToken,
                        refreshToken
                    };
                }
                throw new PasswordsNotMatchError_1.default();
            }
            throw new UserNotFoundError_1.default();
        });
    }
}
exports.default = UserLogin;
