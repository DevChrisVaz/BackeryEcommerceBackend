interface IAuthenticationRepo {
    generateToken(data: object, expiration: string, tokenSecret: string): string;
    validateToken(token: string, tokenSecret: string): boolean;
    getTokenData(token: string): any;
}

export default IAuthenticationRepo;