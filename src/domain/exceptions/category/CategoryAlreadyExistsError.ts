class CategoryAlreadyExistsError extends Error {
    constructor() {
        super("Category already exists");
        this.name = "CategoryAlreadyExists"
    }
}

export default CategoryAlreadyExistsError;