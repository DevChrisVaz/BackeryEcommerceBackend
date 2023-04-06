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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = __importDefault(require("../../driven-adapters/MongoDB/models/comment"));
class CommentRepo {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield comment_1.default.find({ status: { $nin: ["DELETED"] } }).lean();
            return comments;
        });
    }
    // async getRandom(size: number): Promise<Comment[]> {
    //     const comments: Comment[] = await commentModel.aggregate().search().sample(6);
    //     return comments;
    // }
    findMany(findArgs, qty) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield comment_1.default.find(findArgs !== null && findArgs !== void 0 ? findArgs : {}).limit(qty !== null && qty !== void 0 ? qty : 0).lean();
            return comments;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comment_1.default.findOne({ uuid: id }).lean();
            return comment;
        });
    }
    getOne(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield comment_1.default.findOne(params).lean();
            return comment;
        });
    }
    create(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdComment = yield comment_1.default.create(comment);
            return createdComment;
        });
    }
    update(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedComment = yield comment_1.default.findOneAndUpdate({ uuid: comment.uuid }, comment, { new: true, }).lean();
            return updatedComment;
        });
    }
    delete(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedComment = yield comment_1.default.findOneAndUpdate({ uuid: comment.uuid }, {
                $set: {
                    status: "DELETED"
                }
            }, { new: true }).lean();
            return deletedComment;
        });
    }
}
exports.default = CommentRepo;
