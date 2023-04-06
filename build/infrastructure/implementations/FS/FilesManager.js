"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FilesManagerRepo {
    constructor() {
        this.actualPath = "src/infrastructure/implementations/FS";
    }
    adaptPath(filePath) {
        const relative = path_1.default.relative(this.actualPath, filePath);
        return relative;
    }
    exists(filePath) {
        const exists = fs_1.default.existsSync(path_1.default.resolve(__dirname, this.adaptPath(filePath)));
        return exists;
    }
    createFolder(filePath, recursive) {
        fs_1.default.mkdirSync(path_1.default.resolve(__dirname, this.adaptPath(filePath)), { recursive: recursive !== null && recursive !== void 0 ? recursive : false });
        return filePath;
    }
    createFile(filePath, content, options) {
        fs_1.default.writeFileSync(path_1.default.resolve(__dirname, this.adaptPath(filePath)), content, options === null || options === void 0 ? void 0 : options.encoding);
        return filePath;
    }
    readFile(filePath, options) {
        const content = fs_1.default.readFileSync(path_1.default.resolve(__dirname, filePath), options === null || options === void 0 ? void 0 : options.encoding);
        return content.toString();
    }
}
exports.default = FilesManagerRepo;
