import Comment from "../../../domain/entities/comment";
import UserAlreadyCommentedError from "../../../domain/exceptions/comment/UserAlreadyCommentedError";
import ICommentRepo from "../../../domain/repositories/ICommentRepo";

class CreateComment {
    private readonly commentRepo: ICommentRepo;

    constructor(commentRepo: ICommentRepo) {
        this.commentRepo = commentRepo;
    }

    async run(comment: Comment): Promise<Comment> {
        const foundComment: Comment | null = await this.commentRepo.getOne({ firstName: comment.firstName, lastName: comment.lastName });
        if (foundComment) throw new UserAlreadyCommentedError();
        const createdComment: Comment = await this.commentRepo.create(comment);
        return createdComment;
    }
}

export default CreateComment;