import Topping from "../../../domain/entities/topping";
import TopicNotFoundError from "../../../domain/exceptions/topping/ToppingNotFoundError";
import IToppingRepo from "../../../domain/repositories/IToppingRepo";

class UpdateTopping {
    private readonly toppingRepo: IToppingRepo;

    constructor(toppingRepo: IToppingRepo) {
        this.toppingRepo = toppingRepo;
    }

    async run(id: string, topping: Topping): Promise<Topping> {
        const foundTopping: Topping | null = await this.toppingRepo.getById(id);

        if (foundTopping) {
            const toppingToUpdate: Topping = {
                ...foundTopping,
                ...topping
            }

            const updatedTopping: Topping | null = await this.toppingRepo.update(toppingToUpdate);

            if (updatedTopping) return updatedTopping;
        }

        throw new TopicNotFoundError();
    }
}

export default UpdateTopping;