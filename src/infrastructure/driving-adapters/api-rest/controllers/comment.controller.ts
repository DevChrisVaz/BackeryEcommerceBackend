import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import CreateComment from "../../../../application/usecases/comment/CreateComment";
import DeleteComment from "../../../../application/usecases/comment/DeleteComment";
import GetAllComments from "../../../../application/usecases/comment/GetAllComments";
import GetCommentById from "../../../../application/usecases/comment/GetCommentById";
import GetPublicComments from "../../../../application/usecases/comment/GetPublicComments";
import UpdateComment from "../../../../application/usecases/comment/UpdateComment";
import Comment from "../../../../domain/entities/comment";

class CommentController {
    private readonly createCommentUseCase: CreateComment;
    private readonly getCommentByIdUseCase: GetCommentById;
    private readonly getAllCommentsUseCase: GetAllComments;
    private readonly getPublicCommentsUseCase: GetPublicComments;
    private readonly updateCommentUseCase: UpdateComment;
    private readonly deleteCommentUseCase: DeleteComment;

    constructor(
        createCommentUseCase: CreateComment,
        getCommentByIdUseCase: GetCommentById,
        getAllCommentsUseCase: GetAllComments,
        getPublicCommentsUseCase: GetPublicComments,
        updateCommentUseCase: UpdateComment,
        deleteCommentUseCase: DeleteComment
    ) {
        this.createCommentUseCase = createCommentUseCase,
        this.getCommentByIdUseCase = getCommentByIdUseCase,
        this.getAllCommentsUseCase = getAllCommentsUseCase,
        this.getPublicCommentsUseCase = getPublicCommentsUseCase,
        this.updateCommentUseCase = updateCommentUseCase,
        this.deleteCommentUseCase = deleteCommentUseCase
    }

    getAllComments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const comments: Comment[] = await this.getAllCommentsUseCase.run();
            res.status(200).json(comments);
            return;
        } catch(err) {
            next(err);
        }
    }

    getPublicComments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const comments: Comment[] = await this.getPublicCommentsUseCase.run();
            res.status(200).json(comments);
            return;
        } catch(err) {
            next(err);
        }
    }

    getCommentById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const foundComment: Comment | null = await this.getCommentByIdUseCase.run(id);
            res.status(200).json(foundComment);
            return;
        } catch (err) {
            next(err);
        }
    }

    createComment = async (req: Request, res: Response, next: NextFunction) => {
        const comment: Comment = req.body;
        try {
            comment.uuid = uuid();
            const createdComment = await this.createCommentUseCase.run(comment);
            res.status(201).json(createdComment);
            return;
        } catch(err) {
            next(err);
        }
    }

    updateComment = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const comment: Comment = req.body;
        
        try {
            const updatedComment: Comment = await this.updateCommentUseCase.run(id, comment);
            res.status(200).json(updatedComment);
            return;
        } catch(err) {
            next(err);
        }
    }

    deleteComment = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const deletedComment: Comment = await this.deleteCommentUseCase.run(id);
            res.status(200).json(deletedComment);
            return;
        } catch(err) {
            next(err);
        }
    }
}

export default CommentController;