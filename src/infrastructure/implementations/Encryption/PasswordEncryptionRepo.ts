import IPasswordEncryptionRepo from "../../../domain/repositories/encryption/IPasswordEncryptionRepo";
import bcrypt from "bcrypt";

class PasswordEncryptionRepo implements IPasswordEncryptionRepo {
    async hashPassword(password: string): Promise<string> {
        const hashedPassword: string = await bcrypt.hash(password, 12);
        return hashedPassword;
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        const match: boolean = await bcrypt.compare(password, hashedPassword);
        return match;
    }
    
}

export default PasswordEncryptionRepo;