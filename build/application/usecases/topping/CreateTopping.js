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
class CreateTopping {
    constructor(toppingRepo, filesManagerRepo, imageOptimizerRepo) {
        this.toppingRepo = toppingRepo;
        this.filesManagerRepo = filesManagerRepo;
        this.imageOptimizerRepo = imageOptimizerRepo;
        this.toppingImagePath = "public/img/toppings/";
        this.toppingImageStaticPath = "img/toppings";
    }
    run(topping) {
        return __awaiter(this, void 0, void 0, function* () {
            if (topping.image) {
                if (!this.filesManagerRepo.exists(this.toppingImagePath)) {
                    this.filesManagerRepo.createFolder(this.toppingImagePath, true);
                }
                let fileName = topping.uuid + ".webp";
                this.imageOptimizerRepo.optimizeProductImage(topping.image.data, 1024, this.toppingImagePath, fileName);
                topping.image = this.toppingImageStaticPath + "/" + fileName;
            }
            const createdTopping = yield this.toppingRepo.create(topping);
            return createdTopping;
        });
    }
}
exports.default = CreateTopping;
