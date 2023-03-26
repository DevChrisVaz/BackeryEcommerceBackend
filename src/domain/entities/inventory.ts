interface Ingredient {
    ingredient?: string,
    inStock?: number
}

interface Inventory {
    uuid?: string;
    name?: string;
    ingredients?: Ingredient[];
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default Inventory;