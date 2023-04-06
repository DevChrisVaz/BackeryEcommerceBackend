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
exports.authorizeUser = void 0;
const UserRepo_1 = __importDefault(require("../../../../implementations/MongoDB/UserRepo"));
const AuthenticationRepo_1 = __importDefault(require("../../../../implementations/Authentication/JWT/AuthenticationRepo"));
const ValidateUserSession_1 = __importDefault(require("../../../../../application/usecases/user/ValidateUserSession"));
const userRepo = new UserRepo_1.default();
const authenticationRepo = new AuthenticationRepo_1.default();
const validateUserSessionUseCase = new ValidateUserSession_1.default(userRepo, authenticationRepo);
const authorizeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers["authorization"];
    if (authorization) {
        const token = authorization.split(" ")[1];
        if (token) {
            try {
                const isValid = yield validateUserSessionUseCase.run(token);
                if (isValid)
                    return next();
                return res.sendStatus(403);
            }
            catch (err) {
                return res.sendStatus(403);
            }
        }
        return res.sendStatus(401);
    }
    return res.sendStatus(401);
});
exports.authorizeUser = authorizeUser;
