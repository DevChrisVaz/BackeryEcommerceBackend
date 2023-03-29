import Comment from "../../../domain/entities/comment";
import CommentNotFoundError from "../../../domain/exceptions/comment/CommetNotFoundError";
import ICommentRepo from "../../../domain/repositories/ICommentRepo";

class UpdateComment {
    private readonly commentRepo: ICommentRepo;

    constructor(commentRepo: ICommentRepo) {
        this.commentRepo = commentRepo;
    }

    async run(id: string, category: Comment): Promise<Comment> {
        const foundComment: Comment | null = await this.commentRepo.getById(id);

        if (foundComment) {
            const commentToUpdate: Comment = {
                ...foundComment,
                ...category
            }

            const updatedComment: Comment | null = await this.commentRepo.update(commentToUpdate);

            if (updatedComment) return updatedComment;
        }

        throw new CommentNotFoundError();
    }
}

export default UpdateComment;