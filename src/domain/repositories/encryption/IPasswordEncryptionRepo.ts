interface IPasswordEncryptionRepo {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}

export default IPasswordEncryptionRepo;