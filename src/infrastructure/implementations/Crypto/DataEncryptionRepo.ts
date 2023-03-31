import Keys from "../../../domain/entities/keys";
import IDataEncryptionRepo from "../../../domain/repositories/encryption/IDataEncryptionRepo";
import crypto from "crypto";

class DataEncryptionRepo implements IDataEncryptionRepo {
    // private readonly passphrase: string;
    private readonly algorithm: string;
    private readonly key: Buffer;
    private readonly iv: Buffer;

    constructor(algorithm: string, key: Buffer, iv: Buffer) {
        // this.passphrase = passphrase;
        this.algorithm = algorithm;
        this.key = key;
        this.iv = iv;
        
    }

    // generateKeys(): Keys {
    //     const keys: Keys = crypto.generateKeyPairSync('rsa', {
    //         modulusLength: 4096,
    //         publicKeyEncoding: {
    //             type: 'spki',
    //             format: 'pem'
    //         },
    //         privateKeyEncoding: {
    //             type: 'pkcs8',
    //             format: 'pem',
    //             cipher: 'aes-256-cbc',
    //             passphrase: this.passphrase
    //         }
    //     });

    //     return keys;
    // }

    encrypt(data: string) {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);

        let encrypted = cipher.update(data, "utf8", "hex");
        encrypted += cipher.final("hex");

        return encrypted;
    }

    decrypt(encryptedData: string) {
        

        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);

        let decrypted = decipher.update(encryptedData, "hex", "utf8");
        decrypted += decipher.final("utf8");

        return decrypted;
    }

    // encrypt(key: string, data: string): string {
    //     const encryptedData = crypto.publicEncrypt({
    //         key: key,
    //         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    //         oaepHash: 'sha256'
    //     },
    //         Buffer.from(data.toString())
    //     ).toString("base64");

    //     return encryptedData;
    // }

    // decrypt(key: string, data: string): string {
    //     const decryptedData: string = crypto.privateDecrypt({
    //         key: key,
    //         passphrase: this.passphrase,
    //         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    //         oaepHash: 'sha256'
    //     },
    //         Buffer.from(data, "base64")
    //     ).toString('utf8');
    
    //     return decryptedData;
    // }
}

export default DataEncryptionRepo;