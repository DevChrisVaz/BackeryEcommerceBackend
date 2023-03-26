interface Ingredient {
    uuid?: string;
    name?: string;
    unitOfMeasure?: string;
    cost?: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export default Ingredient;