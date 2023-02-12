import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/custom-error.model";

export default function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {

    if (error instanceof CustomError) {
        res.status(error.status).json({ message: error });
    }
    else {
        res.status(500).json({ message: error });
    }


}