import Timestamps from "./timestamps";

interface Comment extends Timestamps {
    uuid?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    description?: string;
    score?: number;
    status?: string;
}

export default Comment;