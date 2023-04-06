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
const user_1 = __importDefault(require("../../driven-adapters/MongoDB/models/user"));
class UserRepo {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.find().lean();
            return users;
        });
    }
    findMany(findArgs, qty) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.find(findArgs !== null && findArgs !== void 0 ? findArgs : {}).limit(qty !== null && qty !== void 0 ? qty : 0).lean();
            return users;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({ uuid: id }).lean();
            return user;
        });
    }
    findOne(findArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne(findArgs).lean();
            return user;
        });
    }
    getByUserName(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({ userName }).lean();
            return user;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield user_1.default.create(user);
            return createdUser;
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield user_1.default.findOneAndUpdate({ userName: user.userName }, user, { new: true, }).lean();
            return updatedUser;
        });
    }
    delete(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield user_1.default.findOneAndUpdate({ userName: user.userName }, {
                $set: {
                    status: "DELETED"
                }
            }, { new: true }).lean();
            return deletedUser;
        });
    }
}
exports.default = UserRepo;
