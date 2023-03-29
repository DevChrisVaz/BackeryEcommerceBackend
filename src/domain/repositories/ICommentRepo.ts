import Comment from "../entities/comment";

interface ICommentRepo {
    getAll(): Promise<Comment[]>;
    getById(id: string): Promise<Comment | null>;
    getOne(params: Comment): Promise<Comment | null>;
    create(comment: Comment): Promise<Comment>;
    update(comment: Comment): Promise<Comment | null>;
    delete(comment: Comment): Promise<Comment | null>;
}

export default ICommentRepo;