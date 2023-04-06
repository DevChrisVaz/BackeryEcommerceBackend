import ToppingType from "../entities/topping-type";

interface IToppingTypeRepo {
    getAll(): Promise<ToppingType[]>;
    getById(id: string): Promise<ToppingType | null>;
    getOne(params: ToppingType): Promise<ToppingType | null>;
    create(toppingType: ToppingType): Promise<ToppingType>;
    update(toppingType: ToppingType): Promise<ToppingType | null>;
    delete(toppingType: ToppingType): Promise<ToppingType | null>;
}

export default IToppingTypeRepo;