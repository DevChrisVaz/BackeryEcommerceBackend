import IFilesManagerRepo from "../../../domain/repositories/files-manager/IFilesManagerRepo";
import path from "path";
import fs from "fs";

class FilesManagerRepo implements IFilesManagerRepo {
    private readonly actualPath: string;

    constructor() {
        this.actualPath = "src/infrastructure/implementations/FS";
    }

    private adaptPath(filePath: string): string {
        const relative: string = path.relative(this.actualPath, filePath);
        return relative;
    }

    exists(filePath: string): boolean {
        const exists: boolean = fs.existsSync(path.resolve(__dirname, this.adaptPath(filePath)));
        return exists;
    }

    createFolder(filePath: string, recursive?: boolean): string {
        fs.mkdirSync(path.resolve(__dirname, this.adaptPath(filePath)), { recursive: recursive ?? false });
        return filePath;
    }

    createFile(filePath: string, content: string, options?: any): string {
        fs.writeFileSync(path.resolve(__dirname, this.adaptPath(filePath)), content, options?.encoding);
        return filePath;
    }

    readFile(filePath: string, options: any): string {
        const content = fs.readFileSync(path.resolve(__dirname, filePath), options?.encoding);
        return content.toString();
    }
}

export default FilesManagerRepo;