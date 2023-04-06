"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class CommentController {
    constructor(createCommentUseCase, getCommentByIdUseCase, getAllCommentsUseCase, getPublicCommentsUseCase, updateCommentUseCase, deleteCommentUseCase) {
        this.getAllComments = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.getAllCommentsUseCase.run();
                res.status(200).json(comments);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.getPublicComments = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.getPublicCommentsUseCase.run();
                res.status(200).json(comments);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.getCommentById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const foundComment = yield this.getCommentByIdUseCase.run(id);
                res.status(200).json(foundComment);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createComment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const comment = req.body;
            try {
                comment.uuid = (0, uuid_1.v4)();
                const createdComment = yield this.createCommentUseCase.run(comment);
                res.status(201).json(createdComment);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.updateComment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const comment = req.body;
            try {
                const updatedComment = yield this.updateCommentUseCase.run(id, comment);
                res.status(200).json(updatedComment);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteComment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedComment = yield this.deleteCommentUseCase.run(id);
                res.status(200).json(deletedComment);
                return;
            }
            catch (err) {
                next(err);
            }
        });
        this.createCommentUseCase = createCommentUseCase,
            this.getCommentByIdUseCase = getCommentByIdUseCase,
            this.getAllCommentsUseCase = getAllCommentsUseCase,
            this.getPublicCommentsUseCase = getPublicCommentsUseCase,
            this.updateCommentUseCase = updateCommentUseCase,
            this.deleteCommentUseCase = deleteCommentUseCase;
    }
}
exports.default = CommentController;
