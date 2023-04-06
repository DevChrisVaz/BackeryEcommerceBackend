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
const UserAlreadyExistsError_1 = __importDefault(require("../../../domain/exceptions/user/UserAlreadyExistsError"));
const path_1 = __importDefault(require("path"));
class CreateUser {
    constructor(userRepo, passwordEncryptionRepo, 
    // dataEncryptionRepo: IDataEncryptionRepo, 
    filesManagerRepo) {
        this.userRepo = userRepo;
        this.passwordEncryptionRepo = passwordEncryptionRepo;
        // this.dataEncryptionRepo = dataEncryptionRepo;
        this.filesManagerRepo = filesManagerRepo;
        // this.keysPath = "private/keys/users";
        this.profileImagePath = "public/img/users/profile";
        this.profileImageStaticPath = "img/users/profile";
    }
    run(user) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.userRepo.getByUserName((_a = user.userName) !== null && _a !== void 0 ? _a : ""))
                throw new UserAlreadyExistsError_1.default();
            // const keys: Keys = this.dataEncryptionRepo.generateKeys();
            // if(!this.filesManagerRepo.exists(this.keysPath)) {
            //     this.filesManagerRepo.createFolder(this.keysPath, true);
            // }
            // this.filesManagerRepo.createFile(this.keysPath + "/" + user.userName + ".pem", keys.privateKey, "utf8");
            if (user.profilePicture && user.profilePicture !== "null" && user.profilePicture.name !== undefined) {
                if (!this.filesManagerRepo.exists(this.profileImagePath)) {
                    this.filesManagerRepo.createFolder(this.profileImagePath, true);
                }
                let fileName = user.uuid + path_1.default.extname(user.profilePicture.name);
                this.filesManagerRepo.createFile(this.profileImagePath + "/" + fileName, user.profilePicture.data);
                user.profilePicture = this.profileImageStaticPath + "/" + fileName;
            }
            user.userName = (_b = user.userName) === null || _b === void 0 ? void 0 : _b.toLowerCase();
            // user.publicKey = keys.publicKey;
            user.password = yield this.passwordEncryptionRepo.hashPassword((_c = user.password) !== null && _c !== void 0 ? _c : "");
            const createdUser = yield this.userRepo.create(user);
            return createdUser;
        });
    }
}
exports.default = CreateUser;
