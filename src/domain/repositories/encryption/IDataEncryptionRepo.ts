import Keys from "../../entities/keys";

interface IDataEncryptionRepo {
    // generateKeys(): Keys;
    encrypt(data: string): string;
    decrypt(encryptedData: string): string;
}

export default IDataEncryptionRepo;