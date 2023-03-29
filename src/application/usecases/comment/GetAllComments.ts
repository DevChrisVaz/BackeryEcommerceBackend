import Comment from "../../../domain/entities/comment";
import ICommentRepo from "../../../domain/repositories/ICommentRepo";

class GetAllComments {
    private readonly commentRepo: ICommentRepo;

    constructor(commentRepo: ICommentRepo) {
        this.commentRepo = commentRepo;
    }

    async run(): Promise<Comment[]> {
        let comments: Comment[] = await this.commentRepo.getAll();
        comments = comments.filter(i => i.status !== "DELETED");
        return comments;
    }
}

export default GetAllComments;