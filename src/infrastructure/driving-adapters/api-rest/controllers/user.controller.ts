import { NextFunction, Request, Response } from "express";
import CreateUser from "../../../../application/usecases/user/CreateUser";
import GetAllUsers from "../../../../application/usecases/user/GetAllUsers";
import GetUserById from "../../../../application/usecases/user/GetUserById";
import UpdateUser from "../../../../application/usecases/user/UpdateUser";
import DeleteUser from "../../../../application/usecases/user/DeleteUser";
import User from "../../../../domain/entities/user";
import { v4 as uuid } from "uuid";
import UserLogin from "../../../../application/usecases/user/UserLogin";
import Tokens from "../../../../domain/entities/tokens";

class UserController {
    private readonly getAllUsersUseCase: GetAllUsers;
    private readonly createUserUseCase: CreateUser;
    private readonly getUserByIdUseCase: GetUserById;
    private readonly updateUserUseCase: UpdateUser;
    private readonly deleteUserUseCase: DeleteUser;
    private readonly userLoginUseCase: UserLogin;

    constructor(
        getAllUsersUseCase: GetAllUsers,
        createUserUseCase: CreateUser,
        getUserByIdUseCase: GetUserById,
        updateUserUseCase: UpdateUser,
        deleteUserUseCase: DeleteUser,
        userLoginUseCase: UserLogin
    ) {
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.createUserUseCase = createUserUseCase;
        this.getUserByIdUseCase = getUserByIdUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
        this.userLoginUseCase = userLoginUseCase;
    }

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users: User[] = await this.getAllUsersUseCase.run();
            res.status(200).json(users);
            return;
        } catch (err) {
            next(err);
        }
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        const user: User = req.body;
        if (req.files) user.profilePicture = req.files.profilePicture;

        try {
            user.uuid = uuid();
            const createdUser = await this.createUserUseCase.run(user);
            res.status(201).json(createdUser);
            return;
        } catch(err) {
            next(err);
        }
    }

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const foundUser: User | null = await this.getUserByIdUseCase.run(id);
            res.status(200).json(foundUser);
            return;
        } catch (err) {
            next(err);
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const user: User = req.body;

        try {
            const updatedUser: User = await this.updateUserUseCase.run(id, user);
            res.status(200).json(updatedUser);
            return;
        } catch (err) {
            next(err);
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const deletedUser: User = await this.deleteUserUseCase.run(id);
            res.status(200).json(deletedUser);
            return;
        } catch (err) {
            next(err);
        }
    }

    userLogin = async (req: Request, res: Response, next: NextFunction) => {
        const { userName, password } = req.body;
        try {
            const tokens: Tokens = await this.userLoginUseCase.run(userName, password);
            res.status(200)
            .cookie("jwt", tokens.refreshToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000 * 7
            })
            .json(tokens.accessToken);
            return;
        } catch (err) {
            next(err);
        }
    }
}

export default UserController;