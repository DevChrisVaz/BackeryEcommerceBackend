import ToppingType from "../../../domain/entities/topping-type";
import IToppingTypeRepo from "../../../domain/repositories/IToppingTypeRepo";

class GetAllToppingTypes {
    private readonly toppingTypeRepo: IToppingTypeRepo;

    constructor(toppingTypeRepo: IToppingTypeRepo) {
        this.toppingTypeRepo = toppingTypeRepo;
    }

    async run(): Promise<ToppingType[]> {
        let toppingTypes: ToppingType[] = await this.toppingTypeRepo.getAll();
        toppingTypes = toppingTypes.filter(i => i.status !== "DELETED");
        return toppingTypes;
    }
}

export default GetAllToppingTypes;