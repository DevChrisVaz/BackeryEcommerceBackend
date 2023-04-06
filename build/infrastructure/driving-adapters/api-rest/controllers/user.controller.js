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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UserController {
    constructor(getAllUsersUseCase, createUserUseCase, getUserByIdUseCase, updateUserUseCase, deleteUserUseCase, userLoginUseCase, refreshUserSessionUseCase, userLogoutUseCase) {
        this.getAllUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getAllUsersUseCase.run();
                res.status(200).json(users);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            if (req.files)
                user.profilePicture = req.files.profilePicture;
            try {
                user.uuid = (0, uuid_1.v4)();
                const createdUser = yield this.createUserUseCase.run(user);
                res.status(201).json(createdUser);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.getUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const foundUser = yield this.getUserByIdUseCase.run(id);
                res.status(200).json(foundUser);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.body;
            try {
                const updatedUser = yield this.updateUserUseCase.run(id, user);
                res.status(200).json(updatedUser);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedUser = yield this.deleteUserUseCase.run(id);
                res.status(200).json(deletedUser);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.userLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userName, password } = req.body;
            try {
                const tokens = yield this.userLoginUseCase.run(userName, password);
                res.status(200)
                    .cookie("jwt", tokens.refreshToken, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000 * 7
                })
                    .json(tokens.accessToken);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.refreshSession = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.jwt;
            try {
                const tokens = yield this.refreshUserSessionUseCase.run(token);
                res.status(201)
                    .cookie("jwt", tokens.refreshToken, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000 * 7
                })
                    .json(tokens.accessToken);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.userLogout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.jwt;
            try {
                yield this.userLogoutUseCase.run(token);
                res.status(200);
            }
            catch (err) {
                next(err);
            }
        });
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.createUserUseCase = createUserUseCase;
        this.getUserByIdUseCase = getUserByIdUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
        this.userLoginUseCase = userLoginUseCase;
        this.refreshUserSessionUseCase = refreshUserSessionUseCase;
        this.userLogoutUseCase = userLogoutUseCase;
    }
}
exports.default = UserController;
