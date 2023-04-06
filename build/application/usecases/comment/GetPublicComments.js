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
class GetPublicComments {
    constructor(commentRepo) {
        this.commentRepo = commentRepo;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let publicComments = [];
            let indexes = [];
            let comments = yield this.commentRepo.getAll();
            comments = comments.filter(i => i.status === "SHOWED");
            if (comments.length > 6) {
                while (indexes.length < 8) {
                    const index = Math.floor(Math.random() * comments.length);
                    if (!indexes.includes(index)) {
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
        });
    }
}
exports.default = GetPublicComments;
