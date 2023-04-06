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
const UserNotFoundError_1 = __importDefault(require("../../../domain/exceptions/user/UserNotFoundError"));
class DeleteUser {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    run(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.userRepo.getById(id);
            if (foundUser) {
                const deletedUser = yield this.userRepo.delete(foundUser);
                if (deletedUser)
                    return deletedUser;
            }
            throw new UserNotFoundError_1.default();
        });
    }
}
exports.default = DeleteUser;
