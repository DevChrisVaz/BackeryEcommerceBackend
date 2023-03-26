import User from "../../../domain/entities/user";
import UserNotFoundError from "../../../domain/exceptions/user/UserNotFoundError";
import IUserRepo from "../../../domain/repositories/IUserRepo";

class DeleteUser {
    private readonly userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async run(id: string): Promise<User> {
        const foundUser: User | null = await this.userRepo.getById(id);

        if(foundUser) {
            const deletedUser = await this.userRepo.delete(foundUser);
            if(deletedUser) return deletedUser;
        }

        throw new UserNotFoundError();
    }
}

export default DeleteUser;