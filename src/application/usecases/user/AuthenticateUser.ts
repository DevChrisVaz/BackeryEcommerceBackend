import IAuthenticationRepo from "../../../domain/repositories/authentication/IAuthenticationRepo";

class AuthenticateUser {
    private readonly authenticationRepo: IAuthenticationRepo;

    constructor(authenticationRepo: IAuthenticationRepo) {
        this.authenticationRepo = authenticationRepo;
    }

    run(token: string): void {
        // this.authenticationRepo.validateToken(token, );
    }
}

export default AuthenticateUser;