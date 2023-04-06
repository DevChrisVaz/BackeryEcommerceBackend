import Topping from "../entities/topping";


interface IToppingRepo {
    getAll(findArgs?: any): Promise<Topping[]>;
    getById(id: string): Promise<Topping | null>;
    create(ingredient: Topping): Promise<Topping>;
    update(ingredient: Topping): Promise<Topping | null>;
    delete(ingredient: Topping): Promise<Topping | null>;
}

export default IToppingRepo;