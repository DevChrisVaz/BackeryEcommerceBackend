"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class DataEncryptionRepo {
    constructor(algorithm, key, iv) {
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
    encrypt(data) {
        const cipher = crypto_1.default.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(data, "utf8", "hex");
        encrypted += cipher.final("hex");
        return encrypted;
    }
    decrypt(encryptedData) {
        const decipher = crypto_1.default.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(encryptedData, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
}
exports.default = DataEncryptionRepo;
