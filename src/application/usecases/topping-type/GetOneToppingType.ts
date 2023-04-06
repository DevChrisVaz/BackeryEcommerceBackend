import ToppingType from "../../../domain/entities/topping-type";
import ToppingTypeNotFoundError from "../../../domain/exceptions/topping-type/ToppingTypeNotFoundError";
import IToppingTypeRepo from "../../../domain/repositories/IToppingTypeRepo";

class GetOneToppingType {
    private readonly toppingTypeRepo: IToppingTypeRepo;

    constructor(toppingTypeRepo: IToppingTypeRepo) {
        this.toppingTypeRepo = toppingTypeRepo;
    }

    async run(params: ToppingType): Promise<ToppingType> {
        const foundToppingType: ToppingType | null = await this.toppingTypeRepo.getOne(params);

        if(!foundToppingType) throw new ToppingTypeNotFoundError();

        return foundToppingType;
    }
}

export default GetOneToppingType;