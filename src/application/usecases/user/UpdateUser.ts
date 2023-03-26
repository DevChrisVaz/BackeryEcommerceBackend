import User from "../../../domain/entities/user";
import UserNotFoundError from "../../../domain/exceptions/user/UserNotFoundError";
import IUserRepo from "../../../domain/repositories/IUserRepo";
import GetUserById from "./GetUserById";

class UpdateUser {
    private readonly userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async run(id: string, user: User): Promise<User> {
        const foundUser: User | null = await this.userRepo.getById(id ?? "");
        
        if (foundUser) {
            const userToUpdate: User = {
                ...foundUser,
                ...user
            }
            
            const updatedUser: User | null = await this.userRepo.update(userToUpdate);

            if (updatedUser) return updatedUser;
        }

        throw new UserNotFoundError();
    }
}

export default UpdateUser;