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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
// import swaggerUI from 'swagger-ui-express';
// import docs from '../../../../docs';
class Server {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.static("public"));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, express_fileupload_1.default)());
        this.app.use((0, cookie_parser_1.default)());
        this.app.use("/api", routes_1.default);
        // this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise(resolve => {
                this.httpServer = this.app.listen(this.port, () => {
                    console.log("Server on port", this.port);
                });
            });
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                if (this.httpServer != null) {
                    this.httpServer.close(error => {
                        if (error != null) {
                            return reject(error);
                        }
                        return resolve();
                    });
                }
            });
        });
    }
}
exports.default = Server;
