import Comment from "../../../domain/entities/comment";
import CommentNotFoundError from "../../../domain/exceptions/comment/CommetNotFoundError";
import ICommentRepo from "../../../domain/repositories/ICommentRepo";

class GetCommentById {
    private readonly commentRepo: ICommentRepo;

    constructor(commentRepo: ICommentRepo) {
        this.commentRepo = commentRepo;
    }

    async run(id: string): Promise<Comment> {
        const foundComment: Comment | null = await this.commentRepo.getById(id);

        if(!foundComment) throw new CommentNotFoundError();

        return foundComment;
    }
}

export default GetCommentById;