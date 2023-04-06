"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateTopping_1 = __importDefault(require("../../../../application/usecases/topping/CreateTopping"));
const DeleteTopping_1 = __importDefault(require("../../../../application/usecases/topping/DeleteTopping"));
const GetAllToppings_1 = __importDefault(require("../../../../application/usecases/topping/GetAllToppings"));
const GetToppingById_1 = __importDefault(require("../../../../application/usecases/topping/GetToppingById"));
const UpdateTopping_1 = __importDefault(require("../../../../application/usecases/topping/UpdateTopping"));
const ToppingRepo_1 = __importDefault(require("../../../implementations/MongoDB/ToppingRepo"));
const topping_controller_1 = __importDefault(require("../controllers/topping.controller"));
const authorizeUser_1 = require("../middlewares/user/authorizeUser");
const FilesManager_1 = __importDefault(require("../../../implementations/FS/FilesManager"));
const ImageOptimizerRepo_1 = __importDefault(require("../../../implementations/Sharp/ImageOptimizerRepo"));
const toppingRepo = new ToppingRepo_1.default();
const filesManagerRepo = new FilesManager_1.default();
const imageOptimizerRepo = new ImageOptimizerRepo_1.default();
const getAllToppings = new GetAllToppings_1.default(toppingRepo);
const getToppingById = new GetToppingById_1.default(toppingRepo);
const createTopping = new CreateTopping_1.default(toppingRepo, filesManagerRepo, imageOptimizerRepo);
const updateTopping = new UpdateTopping_1.default(toppingRepo);
const deleteTopping = new DeleteTopping_1.default(toppingRepo);
const toppingController = new topping_controller_1.default(createTopping, getToppingById, getAllToppings, updateTopping, deleteTopping);
const toppingRouter = (0, express_1.Router)();
toppingRouter.route('/')
    .get(toppingController.getAllToppings)
    .post(authorizeUser_1.authorizeUser, toppingController.createTopping);
toppingRouter.route('/:id')
    .get(authorizeUser_1.authorizeUser, toppingController.getToppingById)
    .put(authorizeUser_1.authorizeUser, toppingController.updateTopping)
    .delete(authorizeUser_1.authorizeUser, toppingController.deleteTopping);
exports.default = toppingRouter;
