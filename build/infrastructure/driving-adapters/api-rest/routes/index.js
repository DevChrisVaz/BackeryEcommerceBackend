"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserAlreadyExistsError_1 = __importDefault(require("../../../../domain/exceptions/user/UserAlreadyExistsError"));
const UserNotFoundError_1 = __importDefault(require("../../../../domain/exceptions/user/UserNotFoundError"));
const user_routes_1 = __importDefault(require("./user.routes"));
const topping_routes_1 = __importDefault(require("./topping.routes"));
const ToppingNotFoundError_1 = __importDefault(require("../../../../domain/exceptions/topping/ToppingNotFoundError"));
const InventoryNotFoundError_1 = __importDefault(require("../../../../domain/exceptions/inventory/InventoryNotFoundError"));
const RecipeNotFoundError_1 = __importDefault(require("../../../../domain/exceptions/recipe/RecipeNotFoundError"));
const recipe_routes_1 = __importDefault(require("./recipe.routes"));
const ProductNotFoundError_1 = __importDefault(require("../../../../domain/exceptions/product/ProductNotFoundError"));
const product_routes_1 = __importDefault(require("./product.routes"));
const category_routes_1 = __importDefault(require("./category.routes"));
const CategoryNotFoundError_1 = __importDefault(require("../../../../domain/exceptions/category/CategoryNotFoundError"));
const CategoryAlreadyExistsError_1 = __importDefault(require("../../../../domain/exceptions/category/CategoryAlreadyExistsError"));
const quote_routes_1 = __importDefault(require("./quote.routes"));
const comment_routes_1 = __importDefault(require("./comment.routes"));
const QuoteNotFoundError_1 = __importDefault(require("../../../../domain/exceptions/quote/QuoteNotFoundError"));
const CommetNotFoundError_1 = __importDefault(require("../../../../domain/exceptions/comment/CommetNotFoundError"));
const UserAlreadyCommentedError_1 = __importDefault(require("../../../../domain/exceptions/comment/UserAlreadyCommentedError"));
const router = (0, express_1.Router)();
router.use("/users", user_routes_1.default);
router.use("/toppings", topping_routes_1.default);
router.use("/recipes", recipe_routes_1.default);
router.use("/products", product_routes_1.default);
router.use("/categories", category_routes_1.default);
router.use("/quotes", quote_routes_1.default);
router.use("/comments", comment_routes_1.default);
router.use((err, req, res, next) => {
    // User Errors ------------------------------------------------
    //#region 
    if (err instanceof UserNotFoundError_1.default) {
        res.status(404).json({
            message: err.message
        });
    }
    else if (err instanceof UserAlreadyExistsError_1.default) {
        res.status(400).json({
            message: err.message
        });
    }
    //#endregion
    // Topic Errors -----------------------------
    //#region
    else if (err instanceof ToppingNotFoundError_1.default) {
        res.status(404).json({
            message: err.message
        });
    }
    //#endregion
    // Inventory Errors ---------------------------------
    //#region
    else if (err instanceof InventoryNotFoundError_1.default) {
        res.status(404).json({
            message: err.message
        });
    }
    //#endregion
    // Recipe Errors ---------------------------------
    //#region
    else if (err instanceof RecipeNotFoundError_1.default) {
        res.status(404).json({
            message: err.message
        });
    }
    //#endregion
    // Product Errors ---------------------------------
    //#region
    else if (err instanceof ProductNotFoundError_1.default) {
        res.status(404).json({
            message: err.message
        });
    }
    //#endregion
    // Category Errors ---------------------------------
    //#region
    else if (err instanceof CategoryNotFoundError_1.default) {
        res.status(404).json({
            name: err.name,
            message: err.message
        });
    }
    else if (err instanceof CategoryAlreadyExistsError_1.default) {
        res.status(400).json({
            name: err.name,
            message: err.message
        });
    }
    //#endregion
    // Quote Errors ------------------------------------
    //#region
    else if (err instanceof QuoteNotFoundError_1.default) {
        res.status(404).json({
            name: err.name,
            message: err.message
        });
    }
    //#endregion
    // Comment Errors ------------------------------------
    //#region
    else if (err instanceof CommetNotFoundError_1.default) {
        res.status(404).json({
            name: err.name,
            message: err.message
        });
    }
    else if (err instanceof UserAlreadyCommentedError_1.default) {
        res.status(400).json({
            name: err.name,
            message: err.message
        });
    }
    //#endregion
    else {
        console.log(err);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
});
exports.default = router;
