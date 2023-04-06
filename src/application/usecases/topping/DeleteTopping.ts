import Topping from "../../../domain/entities/topping";
import ToppingNotFoundError from "../../../domain/exceptions/topping/ToppingNotFoundError";
import IToppingRepo from "../../../domain/repositories/IToppingRepo";

class DeleteTopic {
    private readonly toppingRepo: IToppingRepo;

    constructor(toppingRepo: IToppingRepo) {
        this.toppingRepo = toppingRepo;
    }

    async run(id: string): Promise<Topping> {
        const foundTopping: Topping | null = await this.toppingRepo.getById(id);

        if(foundTopping) {
            const deletedTopping = await this.toppingRepo.delete(foundTopping);
            if (deletedTopping) return deletedTopping;
        }

        throw new ToppingNotFoundError;
    }
}

export default DeleteTopic;