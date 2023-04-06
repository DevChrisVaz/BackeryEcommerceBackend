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
const GetProviderById_1 = __importDefault(require("./GetProviderById"));
class UpdateProvider {
    constructor(providerRepo) {
        this.providerRepo = providerRepo;
        this.getProviderById = new GetProviderById_1.default(providerRepo);
    }
    run(provider) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const foundProvider = yield this.getProviderById.run((_a = provider.uuid) !== null && _a !== void 0 ? _a : "");
            if (foundProvider) {
                const providerToUpdate = Object.assign(Object.assign({}, foundProvider), { fullName: (_b = provider.fullName) !== null && _b !== void 0 ? _b : foundProvider.fullName, phone: (_c = provider.phone) !== null && _c !== void 0 ? _c : foundProvider.phone });
                const updatedProvider = yield this.providerRepo.update(providerToUpdate);
                return updatedProvider;
            }
            return null;
        });
    }
}
exports.default = UpdateProvider;
