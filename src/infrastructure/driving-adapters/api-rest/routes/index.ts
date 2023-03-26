import { NextFunction, Request, Response, Router } from "express";
import UserAlreadyExistsError from "../../../../domain/exceptions/user/UserAlreadyExistsError";
import UserNotFoundError from "../../../../domain/exceptions/user/UserNotFoundError";
import userRouter from "./user.routes";
import ingredientRouter from "./ingredient.routes";
import IngredientNotFoundError from "../../../../domain/exceptions/ingredient/IngredientNotFoundError";
import InventoryNotFoundError from "../../../../domain/exceptions/inventory/InventoryNotFoundError";
import inventoryRouter from "./inventory.routes";
import RecipeNotFoundError from "../../../../domain/exceptions/recipe/RecipeNotFoundError";
import recipeRouter from "./recipe.routes";
import ProductNotFoundError from "../../../../domain/exceptions/product/ProductNotFoundError";
import productRouter from "./product.routes";
import categoryRouter from "./category.routes";
import CategoryNotFoundError from "../../../../domain/exceptions/category/CategoryNotFoundError";
import CategoryAlreadyExistsError from "../../../../domain/exceptions/category/CategoryAlreadyExistsError";

const router = Router();

router.use("/users", userRouter);
router.use("/ingredients", ingredientRouter);
router.use("/inventories", inventoryRouter);
router.use("/recipes", recipeRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    //#region 
    // User Errors ------------------------------------------------
    if (err instanceof UserNotFoundError) {
        res.status(404).json({
            message: err.message
        });
    }

    else if (err instanceof UserAlreadyExistsError) {
        res.status(400).json({
            message: err.message
        });
    }
    //#endregion

    //#region
    // Ingredient Errors -----------------------------
    else if (err instanceof IngredientNotFoundError) {
        res.status(404).json({
            message: err.message
        });
    }
    //#endregion

    //#region
    // Inventory Errors ---------------------------------
    else if (err instanceof InventoryNotFoundError) {
        res.status(404).json({
            message: err.message
        });
    }
    //#endregion

    //#region
    // Recipe Errors ---------------------------------
    else if (err instanceof RecipeNotFoundError) {
        res.status(404).json({
            message: err.message
        });
    }
    //#endregion

    //#region
    // Product Errors ---------------------------------
    else if (err instanceof ProductNotFoundError) {
        res.status(404).json({
            message: err.message
        });
    }
    //#endregion

    //#region
    // Category Errors ---------------------------------
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

    else {
        // next(err);
        console.log(err);
        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

// router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    
// });

export default router;