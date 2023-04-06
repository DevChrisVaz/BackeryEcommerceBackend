import { NextFunction, Request, Response } from "express";
import UserRepo from "../../../../implementations/MongoDB/UserRepo";
import AuthenticationRepo from "../../../../implementations/Authentication/JWT/AuthenticationRepo";
import ValidateUserSession from "../../../../../application/usecases/user/ValidateUserSession";

const userRepo = new UserRepo();
const authenticationRepo = new AuthenticationRepo();

const validateUserSessionUseCase = new ValidateUserSession(userRepo, authenticationRepo);

export const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers["authorization"];
    const apikey = req.headers["apikey"];
    if (apikey){
        if (apikey === process.env.APIKEY) {
            return next();
        }
    } 
    else if (authorization) {
        const token = authorization.split(" ")[1];
        if (token) {
            try {
                const isValid = await validateUserSessionUseCase.run(token);
                if (isValid) return next();
                return res.sendStatus(403);
            } catch(err) {
                return res.sendStatus(403);
            }
        }
        
        return res.sendStatus(401);
    }

    return res.sendStatus(401);
}