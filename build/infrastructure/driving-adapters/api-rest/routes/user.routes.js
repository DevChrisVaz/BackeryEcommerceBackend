"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateUser_1 = __importDefault(require("../../../../application/usecases/user/CreateUser"));
const DeleteUser_1 = __importDefault(require("../../../../application/usecases/user/DeleteUser"));
const GetAllUsers_1 = __importDefault(require("../../../../application/usecases/user/GetAllUsers"));
const GetUserById_1 = __importDefault(require("../../../../application/usecases/user/GetUserById"));
const UpdateUser_1 = __importDefault(require("../../../../application/usecases/user/UpdateUser"));
const UserLogin_1 = __importDefault(require("../../../../application/usecases/user/UserLogin"));
const AuthenticationRepo_1 = __importDefault(require("../../../implementations/Authentication/JWT/AuthenticationRepo"));
const PasswordEncryptionRepo_1 = __importDefault(require("../../../implementations/Encryption/PasswordEncryptionRepo"));
const FilesManager_1 = __importDefault(require("../../../implementations/FS/FilesManager"));
const UserRepo_1 = __importDefault(require("../../../implementations/MongoDB/UserRepo"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const RefreshUserSession_1 = __importDefault(require("../../../../application/usecases/user/RefreshUserSession"));
const authorizeUser_1 = require("../middlewares/user/authorizeUser");
const UserLogout_1 = __importDefault(require("../../../../application/usecases/user/UserLogout"));
const passwordEncryptionRepo = new PasswordEncryptionRepo_1.default;
// const dataEncryptionRepo = new DataEncryptionRepo(process.env.PASSPHRASE ?? "");
const filesManagerRepo = new FilesManager_1.default();
const authenticationRepo = new AuthenticationRepo_1.default();
const userRepo = new UserRepo_1.default();
const getAllUsers = new GetAllUsers_1.default(userRepo);
const createUser = new CreateUser_1.default(userRepo, passwordEncryptionRepo, filesManagerRepo);
const getUserById = new GetUserById_1.default(userRepo);
const updateUser = new UpdateUser_1.default(userRepo);
const deleteUser = new DeleteUser_1.default(userRepo);
const userLogin = new UserLogin_1.default(userRepo, passwordEncryptionRepo, authenticationRepo);
const refreshUserSession = new RefreshUserSession_1.default(userRepo, authenticationRepo);
const userLogout = new UserLogout_1.default(userRepo, authenticationRepo);
const userController = new user_controller_1.default(getAllUsers, createUser, getUserById, updateUser, deleteUser, userLogin, refreshUserSession, userLogout);
const userRouter = (0, express_1.Router)();
userRouter.route('/')
    .get(authorizeUser_1.authorizeUser, userController.getAllUsers)
    .post(authorizeUser_1.authorizeUser, userController.createUser);
userRouter.route('/:id')
    .get(authorizeUser_1.authorizeUser, userController.getUserById)
    .put(authorizeUser_1.authorizeUser, userController.updateUser)
    .delete(authorizeUser_1.authorizeUser, userController.deleteUser);
userRouter.route("/login")
    .post(userController.userLogin);
userRouter.route("/refresh")
    .post(userController.refreshSession);
userRouter.route("/logout")
    .get(userController.userLogout);
exports.default = userRouter;
