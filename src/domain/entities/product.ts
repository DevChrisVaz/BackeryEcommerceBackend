interface Product {
    uuid?: string;
    name?: string;
    recipe?: string;
    description?: string;
    size?: string;
    category?: string;
    price?: number;
    images?: any;
    tags: string[];
    inStock?: number;
    views?: number;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default Product;