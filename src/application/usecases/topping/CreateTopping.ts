import Topping from "../../../domain/entities/topping";
import IToppingRepo from "../../../domain/repositories/IToppingRepo";
import IFilesManagerRepo from "../../../domain/repositories/files-manager/IFilesManagerRepo";
import IImageOptimizerRepo from "../../../domain/repositories/image-optimization/IImageOptimizerRepo";


class CreateTopping {
    private readonly toppingRepo: IToppingRepo;
    private readonly filesManagerRepo: IFilesManagerRepo;
    private readonly imageOptimizerRepo: IImageOptimizerRepo;
    private readonly toppingImagePath: string;
    private readonly toppingImageStaticPath: string;

    constructor(
        toppingRepo: IToppingRepo,
        filesManagerRepo: IFilesManagerRepo,
        imageOptimizerRepo: IImageOptimizerRepo
    ) {
        this.toppingRepo = toppingRepo;
        this.filesManagerRepo = filesManagerRepo;
        this.imageOptimizerRepo = imageOptimizerRepo;
        this.toppingImagePath = "public/img/toppings/";
        this.toppingImageStaticPath = "img/toppings";
    }

    async run(topping: Topping): Promise<Topping> {
        if(topping.image) {
            if(!this.filesManagerRepo.exists(this.toppingImagePath)) {
                this.filesManagerRepo.createFolder(this.toppingImagePath, true);
            }

            let fileName = topping.uuid + ".webp";

            this.imageOptimizerRepo.optimizeProductImage(topping.image.data, 1024, this.toppingImagePath, fileName);
            topping.image = this.toppingImageStaticPath + "/" + fileName;
        }
        const createdTopping: Topping = await this.toppingRepo.create(topping);
        return createdTopping;
    }
}

export default CreateTopping;