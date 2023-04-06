"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class ToppingController {
    constructor(createToppingUseCase, getToppingByIdUseCase, getAllToppingsUseCase, updateToppingUseCase, deleteToppingUseCase) {
        this.getAllToppings = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const toppings = yield this.getAllToppingsUseCase.run();
                res.status(200).json(toppings);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.getToppingById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const foundTopping = yield this.getToppingByIdUseCase.run(id);
                res.status(200).json(foundTopping);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createTopping = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const topping = req.body;
            try {
                topping.uuid = (0, uuid_1.v4)();
                topping.image = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
                topping.price = parseInt(req.body.price);
                const createdTopping = yield this.createToppingUseCase.run(topping);
                res.status(201).json(createdTopping);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.updateTopping = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const topping = req.body;
            try {
                const updatedTopping = yield this.updateToppingUseCase.run(id, topping);
                res.status(200).json(updatedTopping);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteTopping = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedTopping = yield this.deleteToppingUseCase.run(id);
                res.status(200).json(deletedTopping);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createToppingUseCase = createToppingUseCase,
            this.getToppingByIdUseCase = getToppingByIdUseCase,
            this.getAllToppingsUseCase = getAllToppingsUseCase,
            this.updateToppingUseCase = updateToppingUseCase,
            this.deleteToppingUseCase = deleteToppingUseCase;
    }
}
exports.default = ToppingController;
