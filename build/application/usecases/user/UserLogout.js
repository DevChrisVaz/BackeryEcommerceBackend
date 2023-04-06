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
class UserLogout {
    constructor(userRepo, authenticationRepo) {
        this.userRepo = userRepo;
        this.authenticationRepo = authenticationRepo;
    }
    run(token) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = this.authenticationRepo.getTokenData(token);
            const foundUser = yield this.userRepo.getByUserName(tokenData.userName);
            if (foundUser) {
                let tokens = (_a = foundUser === null || foundUser === void 0 ? void 0 : foundUser.tokens) === null || _a === void 0 ? void 0 : _a.filter(t => t !== token);
                foundUser.tokens = tokens;
                yield this.userRepo.update(foundUser);
                return;
            }
            throw new InvalidTokenError_1.default();
        });
    }
}
exports.default = UserLogout;
