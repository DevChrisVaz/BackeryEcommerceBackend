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
const mongoose_1 = require("mongoose");
class MongoDB {
    constructor(DB_URI) {
        this.DB_URI = DB_URI;
    }
    Connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, mongoose_1.set)('strictQuery', false);
                yield (0, mongoose_1.connect)(this.DB_URI);
                console.log("MongoDB running as database");
            }
            catch (err) {
                console.log("No se pudo conectar a la base de datos");
                console.log(err);
            }
        });
    }
}
exports.default = MongoDB;
