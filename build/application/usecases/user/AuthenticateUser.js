"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticateUser {
    constructor(authenticationRepo) {
        this.authenticationRepo = authenticationRepo;
    }
    run(token) {
        // this.authenticationRepo.validateToken(token, );
    }
}
exports.default = AuthenticateUser;
