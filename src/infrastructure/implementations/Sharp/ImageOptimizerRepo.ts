import IImageOptimizerRepo from "../../../domain/repositories/image-optimization/IImageOptimizerRepo";
import sharp from "sharp";

class ImageOptimizerRepo implements IImageOptimizerRepo {
    async optimizeProductImage(image: any, size: number, path: string, fileName: string): Promise<any> {
        const optimizedImage = await sharp(Buffer.from(image)).resize(size).toFormat("webp", { quality: 80 }).toFile(path + fileName);
        console.log(optimizedImage);
        return optimizedImage;
    }
}

export default ImageOptimizerRepo;