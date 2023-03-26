interface Ingredient {
    ingredient: string,
    qty: number
}

interface Recipe {
    uuid?: string;
    name?: string;
    ingredients?: Ingredient[];
    instruction?: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default Recipe;