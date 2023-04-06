import Topping from "../../../domain/entities/topping";
import ToppingNotFoundError from "../../../domain/exceptions/topping/ToppingNotFoundError";
import IToppingRepo from "../../../domain/repositories/IToppingRepo";

class GetToppingById {
    private readonly toppingRepo: IToppingRepo;

    constructor(toppingRepo: IToppingRepo) {
        this.toppingRepo = toppingRepo;
    }

    async run(id: string): Promise<Topping> {
        const foundTopping: Topping | null = await this.toppingRepo.getById(id);

        if(!foundTopping) throw new ToppingNotFoundError();

        return foundTopping;
    }
}

export default GetToppingById;