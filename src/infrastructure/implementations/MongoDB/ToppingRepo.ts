import Topping from "../../../domain/entities/topping";
import IToppingRepo from "../../../domain/repositories/IToppingRepo";
import toppingModel from "../../driven-adapters/MongoDB/models/topping";

class ToppingRepo implements IToppingRepo {
    async getAll(findArgs?: any): Promise<Topping[]> {
        const toppings: Topping[] = await toppingModel.find(findArgs && findArgs).lean();
        return toppings;
    }

    async findMany(findArgs?: Topping, qty?: number): Promise<Topping[]> {
        const toppings: Topping[] = await toppingModel.find(findArgs ?? {}).limit(qty ?? 0).lean();
        return toppings;
    }

    async getById(id: string): Promise<Topping | null> {
        const topping: Topping | null = await toppingModel.findOne({ uuid: id }).lean();
        return topping;
    }

    async findOne(findArgs?: Topping): Promise<Topping | null> {
        const topping: Topping | null = await toppingModel.findOne(findArgs).lean();
        return topping;
    }
    
    async getByUserName(userName: string): Promise<Topping | null> {
        const topping: Topping | null = await toppingModel.findOne({ userName }).lean();
        return topping;
    }

    async create(topping: Topping): Promise<Topping> {
        const createdTopping: Topping = await toppingModel.create(topping);
        return createdTopping;
    }

    async update(topping: Topping): Promise<Topping | null> {
        const updatedTopping = await toppingModel.findOneAndUpdate({ uuid: topping.uuid }, 
            topping, { new: true,  }).lean();
        return updatedTopping;
    }

    async delete(topping: Topping): Promise<Topping | null> {
        const deletedTopping = await toppingModel.findOneAndUpdate({ uuid: topping.uuid }, {
            $set: {
                status: "DELETED"
            }
        }, { new: true }).lean();
        return deletedTopping;
    }
}

export default ToppingRepo;