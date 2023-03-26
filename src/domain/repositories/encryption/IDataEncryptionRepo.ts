import Keys from "../../entities/keys";

interface IDataEncryptionRepo {
    generateKeys(): Keys;
    encrypt(key: string, data: string): string;
    decrypt(key: string, data: string): string;
}

export default IDataEncryptionRepo;