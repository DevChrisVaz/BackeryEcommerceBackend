import Keys from "../../../domain/entities/keys";
import User from "../../../domain/entities/user";
import UserAlreadyExistsError from "../../../domain/exceptions/user/UserAlreadyExistsError";
import IDataEncryptionRepo from "../../../domain/repositories/encryption/IDataEncryptionRepo";
import IPasswordEncryptionRepo from "../../../domain/repositories/encryption/IPasswordEncryptionRepo";
import IFilesManagerRepo from "../../../domain/repositories/files-manager/IFilesManagerRepo";
import IUserRepo from "../../../domain/repositories/IUserRepo";
import path from "path";

class CreateUser {
    private readonly userRepo: IUserRepo;
    private readonly passwordEncryptionRepo: IPasswordEncryptionRepo;
    private readonly dataEncryptionRepo: IDataEncryptionRepo;
    private readonly filesManagerRepo: IFilesManagerRepo;
    // private readonly keysPath: string;
    private readonly profileImagePath: string;
    private readonly profileImageStaticPath: string;

    constructor(
        userRepo: IUserRepo, 
        passwordEncryptionRepo: IPasswordEncryptionRepo,
        dataEncryptionRepo: IDataEncryptionRepo, 
        filesManagerRepo: IFilesManagerRepo
    ) {
        this.userRepo = userRepo;
        this.passwordEncryptionRepo = passwordEncryptionRepo;
        this.dataEncryptionRepo = dataEncryptionRepo;
        this.filesManagerRepo = filesManagerRepo;
        // this.keysPath = "private/keys/users";
        this.profileImagePath = "public/img/users/profile";
        this.profileImageStaticPath = "img/users/profile";
    }

    async run(user: User): Promise<User> {
        if(await this.userRepo.getByUserName(user.userName ?? "")) 
            throw new UserAlreadyExistsError(); 
        
        // const keys: Keys = this.dataEncryptionRepo.generateKeys();

        // if(!this.filesManagerRepo.exists(this.keysPath)) {
        //     this.filesManagerRepo.createFolder(this.keysPath, true);
        // }

        // this.filesManagerRepo.createFile(this.keysPath + "/" + user.userName + ".pem", keys.privateKey, "utf8");

        
        if (user.profilePicture !== "null") {
            if(!this.filesManagerRepo.exists(this.profileImagePath)) {
                this.filesManagerRepo.createFolder(this.profileImagePath, true);
            }

            let fileName = user.uuid + path.extname(user.profilePicture.name);

            this.filesManagerRepo.createFile(this.profileImagePath + "/" + fileName, user.profilePicture.data);
            user.profilePicture = this.profileImageStaticPath + "/" + fileName;
        }

        user.userName = user.userName?.toLowerCase();
        // user.publicKey = keys.publicKey;
        user.password = await this.passwordEncryptionRepo.hashPassword(user.password ?? "");

        const createdUser: User = await this.userRepo.create(user);

        return createdUser;
    }
}

export default CreateUser;