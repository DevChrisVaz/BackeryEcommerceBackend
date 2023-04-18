import { NextFunction, Request, Response, Router } from "express";
import UserAlreadyExistsError from "../../../../domain/exceptions/user/UserAlreadyExistsError";
import UserNotFoundError from "../../../../domain/exceptions/user/UserNotFoundError";
import userRouter from "./user.routes";
import toppingRouter from "./topping.routes";
import ToppingNotFoundError from "../../../../domain/exceptions/topping/ToppingNotFoundError";
import InventoryNotFoundError from "../../../../domain/exceptions/inventory/InventoryNotFoundError";
import RecipeNotFoundError from "../../../../domain/exceptions/recipe/RecipeNotFoundError";
import recipeRouter from "./recipe.routes";
import ProductNotFoundError from "../../../../domain/exceptions/product/ProductNotFoundError";
import productRouter from "./product.routes";
import categoryRouter from "./category.routes";
import CategoryNotFoundError from "../../../../domain/exceptions/category/CategoryNotFoundError";
import CategoryAlreadyExistsError from "../../../../domain/exceptions/category/CategoryAlreadyExistsError";
import quoteRouter from "./quote.routes";
import commentRouter from "./comment.routes";
import QuoteNotFoundError from "../../../../domain/exceptions/quote/QuoteNotFoundError";
import CommentNotFoundError from "../../../../domain/exceptions/comment/CommetNotFoundError";
import UserAlreadyCommentedError from "../../../../domain/exceptions/comment/UserAlreadyCommentedError";
import PasswordsNotMatchError from "../../../../domain/exceptions/PasswordsNotMatchError";

const router = Router();

router.use("/users", userRouter);
router.use("/toppings", toppingRouter);
router.use("/recipes", recipeRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/quotes", quoteRouter);
router.use("/comments", commentRouter);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // User Errors ------------------------------------------------
    //#region 
    if (err instanceof UserNotFoundError) {
        res.status(404).json({
            message: err.message,
            name: err.name
        });
    }

    else if (err instanceof UserAlreadyExistsError) {
        res.status(400).json({
            message: err.message
        });
    }

    else if (err instanceof PasswordsNotMatchError) {
        res.status(400).json({
            message: err.message,
            name: err.name
        });
    }
    //#endregion

    // Topic Errors -----------------------------
    //#region
    else if (err instanceof ToppingNotFoundError) {
        res.status(404).json({
            message: err.message
        });
    }
    //#endregion

    // Inventory Errors ---------------------------------
    //#region
    else if (err instanceof InventoryNotFoundError) {
        res.status(404).json({
            message: err.message
        });
    }
    //#endregion

    // Recipe Errors ---------------------------------
    //#region
    else if (err instanceof RecipeNotFoundError) {
        res.status(404).json({
            message: err.message
        });
    }
    //#endregion

    // Product Errors ---------------------------------
    //#region
    else if (err instanceof ProductNotFoundError) {
        res.status(404).json({
            message: err.message
        });
    }
    //#endregion

    // Category Errors ---------------------------------
    //#region
    else if (err instanceof CategoryNotFoundError) {
        res.status(404).json({
            name: err.name,
            message: err.message
        });
    }
    else if (err instanceof CategoryAlreadyExistsError) {
        res.status(400).json({
            name: err.name,
            message: err.message
        });
    }
    //#endregion

    // Quote Errors ------------------------------------
    //#region
    else if (err instanceof QuoteNotFoundError) {
        res.status(404).json({
            name: err.name,
            message: err.message
        });
    }
    //#endregion

    // Comment Errors ------------------------------------
    //#region
    else if (err instanceof CommentNotFoundError) {
        res.status(404).json({
            name: err.name,
            message: err.message
        });
    }
    else if (err instanceof UserAlreadyCommentedError) {
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

export default router;