import ToppingType from "../../../domain/entities/topping-type";
import ToppingTypeNotFoundError from "../../../domain/exceptions/topping-type/ToppingTypeNotFoundError";
import IToppingTypeRepo from "../../../domain/repositories/IToppingTypeRepo";

class UpdateTopppingType {
    private readonly toppingTypeRepo: IToppingTypeRepo;

    constructor(toppingTypeRepo: IToppingTypeRepo) {
        this.toppingTypeRepo = toppingTypeRepo;
    }

    async run(id: string, toppingType: ToppingType): Promise<ToppingType> {
        const foundToppingType: ToppingType | null = await this.toppingTypeRepo.getById(id);

        if (foundToppingType) {
            const toppingTypeToUpdate: ToppingType = {
                ...foundToppingType,
                ...toppingType
            }

            const updatedToppingType: ToppingType | null = await this.toppingTypeRepo.update(toppingTypeToUpdate);

            if (updatedToppingType) return updatedToppingType;
        }

        throw new ToppingTypeNotFoundError();
    }
}

export default UpdateTopppingType;