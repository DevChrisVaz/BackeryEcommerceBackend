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
const MongoDB_1 = __importDefault(require("../../driven-adapters/MongoDB"));
const server_1 = __importDefault(require("./server"));
class App {
    startDatabase() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const db_uri = (_a = process.env.DB_URI) !== null && _a !== void 0 ? _a : "";
            this.database = new MongoDB_1.default(db_uri);
            return yield this.database.Connect();
        });
    }
    start() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
            this.server = new server_1.default(port);
            return yield this.server.listen();
        });
    }
    stop() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return yield ((_a = this.server) === null || _a === void 0 ? void 0 : _a.stop());
        });
    }
}
exports.default = App;
