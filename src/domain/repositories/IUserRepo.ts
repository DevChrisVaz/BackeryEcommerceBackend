import User from "../entities/user";

interface IUserRepo {
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User | null>;
    getByUserName(userName: string): Promise<User | null>;
    create(user: User): Promise<User>;
    update(user: User): Promise<User | null>;
    delete(user: User): Promise<User | null>;
}

export default IUserRepo;