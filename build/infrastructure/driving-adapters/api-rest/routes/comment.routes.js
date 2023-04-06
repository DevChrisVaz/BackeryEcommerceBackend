"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateComment_1 = __importDefault(require("../../../../application/usecases/comment/CreateComment"));
const DeleteComment_1 = __importDefault(require("../../../../application/usecases/comment/DeleteComment"));
const GetAllComments_1 = __importDefault(require("../../../../application/usecases/comment/GetAllComments"));
const GetCommentById_1 = __importDefault(require("../../../../application/usecases/comment/GetCommentById"));
const GetPublicComments_1 = __importDefault(require("../../../../application/usecases/comment/GetPublicComments"));
const UpdateComment_1 = __importDefault(require("../../../../application/usecases/comment/UpdateComment"));
const CommentRepo_1 = __importDefault(require("../../../implementations/MongoDB/CommentRepo"));
const comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
const authorizeUser_1 = require("../middlewares/user/authorizeUser");
const commentRepo = new CommentRepo_1.default();
const getAllComments = new GetAllComments_1.default(commentRepo);
const getPublicComments = new GetPublicComments_1.default(commentRepo);
const getCommentById = new GetCommentById_1.default(commentRepo);
const createComment = new CreateComment_1.default(commentRepo);
const updateComment = new UpdateComment_1.default(commentRepo);
const deleteComment = new DeleteComment_1.default(commentRepo);
const commentController = new comment_controller_1.default(createComment, getCommentById, getAllComments, getPublicComments, updateComment, deleteComment);
const commentRouter = (0, express_1.Router)();
commentRouter.route('/')
    .get(authorizeUser_1.authorizeUser, commentController.getAllComments)
    .post(commentController.createComment);
commentRouter.route("/public")
    .get(commentController.getPublicComments);
commentRouter.route('/:id')
    .get(authorizeUser_1.authorizeUser, commentController.getCommentById)
    .put(authorizeUser_1.authorizeUser, commentController.updateComment)
    .delete(authorizeUser_1.authorizeUser, commentController.deleteComment);
exports.default = commentRouter;
