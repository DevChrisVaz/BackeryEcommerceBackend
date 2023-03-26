import { NextFunction, Request, Response } from "express";

export const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers["authorization"];
    if (authorization) {
        const token = authorization.split(" ")[1];
        
    }
}