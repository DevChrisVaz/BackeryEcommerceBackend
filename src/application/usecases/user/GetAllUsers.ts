import User from "../../../domain/entities/user";
import IUserRepo from "../../../domain/repositories/IUserRepo";

class GetAllUsers {
    private readonly userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async run(): Promise<User[]> {
        let users: User[] = await this.userRepo.getAll();
        users = users.filter(u => u.status !== "DELETED");
        return users;
    }
}

export default GetAllUsers;