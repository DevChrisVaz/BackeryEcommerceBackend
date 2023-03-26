interface IFilesManagerRepo {
    exists(path: string): boolean;
    createFolder(path: string, recursive?: boolean): string;
    createFile(path: string, content: string, options?: any): string;
    readFile(path: string, options: any): string;
}

export default IFilesManagerRepo;