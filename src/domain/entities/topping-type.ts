import Timestamps from "./timestamps";

interface ToppingType extends Timestamps {
    uuid?: string;
    name?: string;
    status?: string;
}

export default ToppingType;