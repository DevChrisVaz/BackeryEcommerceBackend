import Comment from "../../../domain/entities/comment";
import ICommentRepo from "../../../domain/repositories/ICommentRepo";

class GetPublicComments {
    private readonly commentRepo: ICommentRepo;

    constructor(commentRepo: ICommentRepo) {
        this.commentRepo = commentRepo;
    }

    async run(): Promise<Comment[]> {
        let publicComments: Comment[] = [];
        let indexes: number[] = [];
        let comments: Comment[] = await this.commentRepo.getAll();
        comments = comments.filter(i => i.status === "SHOWED");
        if (comments.length > 6) {
            while (indexes.length < 8) {
                const index = Math.floor(Math.random() * comments.length);
                if(!indexes.includes(index)) {
                    indexes.push(index);
                }
            }
            for (let index in indexes) {
                publicComments.push(comments[index]);
            }
            return publicComments;

            //mongoose $sample para aleatorios ----> $sample: { size: 6 }
        }
        return comments;
    }
}

export default GetPublicComments;