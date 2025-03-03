import { NextFunction, Request, Response } from "express";
import FailureResult from "./core/results/failure-result";
import jwt from "jsonwebtoken";

export default function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
    if(req.path.startsWith("/api/auth")) {
        next();
        return;
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const response = new FailureResult("Authorization header is missing or invalid");
        res.status(401).send(response);
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const SECRET_KEY = process.env.JWT_SECRET_KEY;
        if(!SECRET_KEY) {
            console.error("JWT secret key not provided!");
            process.exit(1);
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        if(typeof decoded !== "string" && decoded.email) {
            req.body.email = decoded.email;
        }
        next();
    } catch(err) {
        const response = new FailureResult("Invalid token");
        res.status(401).send(response);
        return;
    }
}
