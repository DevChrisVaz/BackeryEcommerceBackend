import User from "../../../domain/entities/user";
import IUserRepo from "../../../domain/repositories/IUserRepo";
import userModel from "../../driven-adapters/MongoDB/models/user";

class UserRepo implements IUserRepo {
    async getAll(): Promise<User[]> {
        const users: User[] = await userModel.find().lean();
        return users;
    }

    async findMany(findArgs?: User, qty?: number): Promise<User[]> {
        const users: User[] = await userModel.find(findArgs ?? {}).limit(qty ?? 0).lean();
        return users;
    }

    async getById(id: string): Promise<User | null> {
        const user: User | null = await userModel.findOne({ uuid: id }).lean();
        return user;
    }

    async findOne(findArgs?: User): Promise<User | null> {
        const user: User | null = await userModel.findOne(findArgs).lean();
        return user;
    }
    
    async getByUserName(userName: string): Promise<User | null> {
        const user: User | null = await userModel.findOne({ userName }).lean();
        return user;
    }

    async create(user: User): Promise<User> {
        const createdUser = await userModel.create(user);
        return createdUser;
    }

    async update(user: User): Promise<User | null> {
        const updatedUser = await userModel.findOneAndUpdate({ userName: user.userName }, 
            user, { new: true,  }).lean();
        return updatedUser;
    }

    async delete(user: User): Promise<User | null> {
        const deletedUser = await userModel.findOneAndUpdate({ userName: user.userName },{
            $set: {
                status: "DELETED"
            }
        }, { new: true }).lean();
        return deletedUser;
    }
}

export default UserRepo;