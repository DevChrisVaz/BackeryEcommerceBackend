import ToppingType from "../../../domain/entities/topping-type";
import ToppingTypeNotFoundError from "../../../domain/exceptions/topping-type/ToppingTypeNotFoundError";
import IToppingTypeRepo from "../../../domain/repositories/IToppingTypeRepo";

class GetCategoryById {
    private readonly toppingTypeRepo: IToppingTypeRepo;

    constructor(toppingTypeRepo: IToppingTypeRepo) {
        this.toppingTypeRepo = toppingTypeRepo;
    }

    async run(id: string): Promise<ToppingType> {
        const foundToppingType: ToppingType | null = await this.toppingTypeRepo.getById(id);

        if(!foundToppingType) throw new ToppingTypeNotFoundError();

        return foundToppingType;
    }
}

export default GetCategoryById;