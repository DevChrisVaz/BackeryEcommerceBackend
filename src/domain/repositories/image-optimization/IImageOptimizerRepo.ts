interface IImageOptimizerRepo {
    optimizeProductImage(image: any, size: number, path: string, fileName: string): Promise<any>;
}

export default IImageOptimizerRepo;