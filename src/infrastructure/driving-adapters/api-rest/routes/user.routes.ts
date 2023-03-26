import { Router } from "express";
import CreateUser from "../../../../application/usecases/user/CreateUser";
import DeleteUser from "../../../../application/usecases/user/DeleteUser";
import GetAllUsers from "../../../../application/usecases/user/GetAllUsers";
import GetUserById from "../../../../application/usecases/user/GetUserById";
import UpdateUser from "../../../../application/usecases/user/UpdateUser";
import UserLogin from "../../../../application/usecases/user/UserLogin";
import AuthenticationRepo from "../../../implementations/Authentication/JWT/AuthenticationRepo";
import DataEncryptionRepo from "../../../implementations/Crypto/DataEncryptionRepo";
import PasswordEncryptionRepo from "../../../implementations/Encryption/PasswordEncryptionRepo";
import FilesManagerRepo from "../../../implementations/FS/FilesManager";
import UserRepo from "../../../implementations/MongoDB/UserRepo";
import UserController from "../controllers/user.controller";

const passwordEncryptionRepo = new PasswordEncryptionRepo;
const dataEncryptionRepo = new DataEncryptionRepo(process.env.PASSPHRASE ?? "");
const filesManagerRepo = new FilesManagerRepo();
const authenticationRepo = new AuthenticationRepo();

const userRepo = new UserRepo();
const getAllUsers = new GetAllUsers(userRepo);
const createUser = new CreateUser(userRepo, passwordEncryptionRepo,dataEncryptionRepo, filesManagerRepo);
const getUserById = new GetUserById(userRepo);
const updateUser = new UpdateUser(userRepo);
const deleteUser = new DeleteUser(userRepo);
const userLogin = new UserLogin(userRepo, passwordEncryptionRepo, authenticationRepo);
const userController = new UserController(getAllUsers, createUser, getUserById, updateUser, deleteUser, userLogin);

const userRouter = Router();

userRouter.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);
userRouter.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
userRouter.route("/login")
    .post(userController.userLogin);

export default userRouter;