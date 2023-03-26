import User from "../../../domain/entities/user";
import IUserRepo from "../../../domain/repositories/IUserRepo";

class GetUserByUserName {
    private readonly userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async run(userName: string): Promise<User> {
        const foundUser: User | null = await this.userRepo.getByUserName(userName);

        if(!foundUser) throw new Error("Error");

        return foundUser;
    }
}

export default GetUserByUserName;