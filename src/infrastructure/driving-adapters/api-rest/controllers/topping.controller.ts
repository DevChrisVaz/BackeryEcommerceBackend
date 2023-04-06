import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import CreateTopping from "../../../../application/usecases/topping/CreateTopping";
import DeleteTopping from "../../../../application/usecases/topping/DeleteTopping";
import GetAllToppings from "../../../../application/usecases/topping/GetAllToppings";
import GetToppingById from "../../../../application/usecases/topping/GetToppingById";
import UpdateTopping from "../../../../application/usecases/topping/UpdateTopping";
import Topping from "../../../../domain/entities/topping";

class ToppingController {
    private readonly createToppingUseCase: CreateTopping;
    private readonly getToppingByIdUseCase: GetToppingById;
    private readonly getAllToppingsUseCase: GetAllToppings;
    private readonly updateToppingUseCase: UpdateTopping;
    private readonly deleteToppingUseCase: DeleteTopping;

    constructor(
        createToppingUseCase: CreateTopping,
        getToppingByIdUseCase: GetToppingById,
        getAllToppingsUseCase: GetAllToppings,
        updateToppingUseCase: UpdateTopping,
        deleteToppingUseCase: DeleteTopping
    ) {
        this.createToppingUseCase = createToppingUseCase,
        this.getToppingByIdUseCase = getToppingByIdUseCase,
        this.getAllToppingsUseCase = getAllToppingsUseCase,
        this.updateToppingUseCase = updateToppingUseCase,
        this.deleteToppingUseCase = deleteToppingUseCase
    }

    getAllToppings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const toppings: Topping[] = await this.getAllToppingsUseCase.run();
            res.status(200).json(toppings);
            return;
        } catch(err) {
            next(err);
        }
    }

    getToppingById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const foundTopping: Topping | null = await this.getToppingByIdUseCase.run(id);
            res.status(200).json(foundTopping);
            return;
        } catch (err) {
            next(err);
        }
    }

    createTopping = async (req: Request, res: Response, next: NextFunction) => {
        const topping: Topping = req.body;
        try {
            topping.uuid = uuid();
            topping.image = req.files?.image;
            topping.price = parseInt(req.body.price);
            const createdTopping = await this.createToppingUseCase.run(topping);
            res.status(201).json(createdTopping);
            return;
        } catch(err) {
            next(err);
        }
    }

    updateTopping = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const topping: Topping = req.body;
        
        try {
            const updatedTopping: Topping = await this.updateToppingUseCase.run(id, topping);
            res.status(200).json(updatedTopping);
            return;
        } catch(err) {
            next(err);
        }
    }

    deleteTopping = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const deletedTopping: Topping = await this.deleteToppingUseCase.run(id);
            res.status(200).json(deletedTopping);
            return;
        } catch(err) {
            next(err);
        }
    }
}

export default ToppingController;