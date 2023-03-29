import Timestamps from "./timestamps";

interface Product {
    product?: string;
    qty?: number;
}

interface Quote extends Timestamps {
    uuid?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    zip?: string;
    phone?: string;
    email?: string;
    details?: string;
    products?: Product[];
    status?: string;
}

export default Quote;