class CategoryNotFoundError extends Error {
    constructor() {
        super("Category not found");
        this.name = "CategoryNotFound";
    }
}

export default CategoryNotFoundError;