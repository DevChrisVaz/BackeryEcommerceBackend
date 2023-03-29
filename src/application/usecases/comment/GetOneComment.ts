import Comment from "../../../domain/entities/comment";
import CommentNotFoundError from "../../../domain/exceptions/comment/CommetNotFoundError";
import ICommentRepo from "../../../domain/repositories/ICommentRepo";

class GetOneComment {
    private readonly commentRepo: ICommentRepo;

    constructor(commentRepo: ICommentRepo) {
        this.commentRepo = commentRepo;
    }

    async run(params: Comment): Promise<Comment> {
        const foundComment: Comment | null = await this.commentRepo.getOne(params);

        if(!foundComment) throw new CommentNotFoundError();

        return foundComment;
    }
}

export default GetOneComment;