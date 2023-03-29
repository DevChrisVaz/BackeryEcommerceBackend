import { Router } from "express";
import CreateComment from "../../../../application/usecases/comment/CreateComment";
import DeleteComment from "../../../../application/usecases/comment/DeleteComment";
import GetAllComments from "../../../../application/usecases/comment/GetAllComments";
import GetCommentById from "../../../../application/usecases/comment/GetCommentById";
import GetPublicComments from "../../../../application/usecases/comment/GetPublicComments";
import UpdateComment from "../../../../application/usecases/comment/UpdateComment";
import CommentRepo from "../../../implementations/MongoDB/CommentRepo";
import CommentController from "../controllers/comment.controller";

const commentRepo = new CommentRepo();
const getAllComments = new GetAllComments(commentRepo);
const getPublicComments = new GetPublicComments(commentRepo);
const getCommentById = new GetCommentById(commentRepo);
const createComment = new CreateComment(commentRepo);
const updateComment = new UpdateComment(commentRepo);
const deleteComment = new DeleteComment(commentRepo);
const commentController = new CommentController(
    createComment,
    getCommentById,
    getAllComments,
    getPublicComments,
    updateComment,
    deleteComment
)

const commentRouter = Router();

commentRouter.route('/')
    .get(commentController.getAllComments)
    .post(commentController.createComment);
commentRouter.route("/public")
    .get(commentController.getPublicComments);
commentRouter.route('/:id')
    .get(commentController.getCommentById)
    .put(commentController.updateComment)
    .delete(commentController.deleteComment);

export default commentRouter;