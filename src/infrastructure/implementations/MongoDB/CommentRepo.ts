import Comment from "../../../domain/entities/comment";
import ICommentRepo from "../../../domain/repositories/ICommentRepo";
import commentModel from "../../driven-adapters/MongoDB/models/comment";

class CommentRepo implements ICommentRepo {
    async getAll(): Promise<Comment[]> {
        const comments: Comment[] = await commentModel.find({ status: { $nin: ["DELETED"] } }).lean();
        return comments;
    }

    // async getRandom(size: number): Promise<Comment[]> {
    //     const comments: Comment[] = await commentModel.aggregate().search().sample(6);
    //     return comments;
    // }

    async findMany(findArgs?: Comment, qty?: number): Promise<Comment[]> {
        const comments: Comment[] = await commentModel.find(findArgs ?? {}).limit(qty ?? 0).lean();
        return comments;
    }

    async getById(id: string): Promise<Comment | null> {
        const comment: Comment | null = await commentModel.findOne({ uuid: id }).lean();
        return comment;
    }

    async getOne(params: Comment): Promise<Comment | null> {
        const comment: Comment | null = await commentModel.findOne(params).lean();
        return comment;
    }

    async create(comment: Comment): Promise<Comment> {
        const createdComment: Comment = await commentModel.create(comment);
        return createdComment;
    }

    async update(comment: Comment): Promise<Comment | null> {
        const updatedComment = await commentModel.findOneAndUpdate({ uuid: comment.uuid }, 
            comment, { new: true,  }).lean();
        return updatedComment;
    }

    async delete(comment: Comment): Promise<Comment | null> {
        const deletedComment = await commentModel.findOneAndUpdate({ uuid: comment.uuid }, {
            $set: {
                status: "DELETED"
            }
        }, { new: true }).lean();
        return deletedComment;
    }
}

export default CommentRepo;