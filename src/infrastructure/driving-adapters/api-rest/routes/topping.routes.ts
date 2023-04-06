import { Router } from "express";
import CreateTopping from "../../../../application/usecases/topping/CreateTopping";
import DeleteTopping from "../../../../application/usecases/topping/DeleteTopping";
import GetAllToppings from "../../../../application/usecases/topping/GetAllToppings";
import GetToppingById from "../../../../application/usecases/topping/GetToppingById";
import UpdateTopping from "../../../../application/usecases/topping/UpdateTopping";
import ToppingRepo from "../../../implementations/MongoDB/ToppingRepo";
import ToppingController from "../controllers/topping.controller";
import { authorizeUser } from "../middlewares/user/authorizeUser";
import FilesManagerRepo from "../../../implementations/FS/FilesManager";
import ImageOptimizerRepo from "../../../implementations/Sharp/ImageOptimizerRepo";

const toppingRepo = new ToppingRepo();
const filesManagerRepo = new FilesManagerRepo();
const imageOptimizerRepo = new ImageOptimizerRepo();
const getAllToppings = new GetAllToppings(toppingRepo);
const getToppingById = new GetToppingById(toppingRepo);
const createTopping = new CreateTopping(toppingRepo, filesManagerRepo, imageOptimizerRepo);
const updateTopping = new UpdateTopping(toppingRepo);
const deleteTopping = new DeleteTopping(toppingRepo);
const toppingController = new ToppingController(
    createTopping,
    getToppingById,
    getAllToppings,
    updateTopping,
    deleteTopping
)

const toppingRouter = Router();

toppingRouter.route('/')
    .get(toppingController.getAllToppings)
    .post(authorizeUser, toppingController.createTopping);
toppingRouter.route('/:id')
    .get(authorizeUser, toppingController.getToppingById)
    .put(authorizeUser, toppingController.updateTopping)
    .delete(authorizeUser, toppingController.deleteTopping);

export default toppingRouter;