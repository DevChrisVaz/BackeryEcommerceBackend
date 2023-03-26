import Timestamps from "./timestamps";

interface Category extends Timestamps {
    uuid?: string;
    name?: string;
    type?: string;
    description?: string;
    status?: string;
}

export default Category;