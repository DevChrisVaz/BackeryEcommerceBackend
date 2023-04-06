import Topping from "../../../domain/entities/topping";
import IToppingRepo from "../../../domain/repositories/IToppingRepo";


class GetAllToppings {
    private readonly toppingRepo: IToppingRepo;

    constructor(toppingRepo: IToppingRepo) {
        this.toppingRepo = toppingRepo;
    }

    async run(): Promise<Topping[]> {
        let toppings: Topping[] = await this.toppingRepo.getAll();
        toppings = toppings.filter(i => i.status !== "DELETED");
        return toppings;
    }
}

export default GetAllToppings;