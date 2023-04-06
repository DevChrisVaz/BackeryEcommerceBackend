import ToppingType from "../../../domain/entities/topping-type";
import ToppingTypeAlreadyExistsError from "../../../domain/exceptions/topping-type/ToppingTypeAlreadyExistsError";
import IToppingTypeRepo from "../../../domain/repositories/IToppingTypeRepo";


class CreateToppingType {
    private readonly toppingTypeRepo: IToppingTypeRepo;

    constructor(toppingTypeRepo: IToppingTypeRepo) {
        this.toppingTypeRepo = toppingTypeRepo;
    }

    async run(toppingType: ToppingType): Promise<ToppingType> {
        const foundToppingType: ToppingType | null = await this.toppingTypeRepo.getOne({ name: toppingType.name });
        if (foundToppingType) throw new ToppingTypeAlreadyExistsError();
        const createdToppingType: ToppingType = await this.toppingTypeRepo.create(toppingType);
        return createdToppingType;
    }
}

export default CreateToppingType;