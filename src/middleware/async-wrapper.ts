import { NextFunction, Request, Response } from "express";

export default function asyncWrapperPrototype<T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T | undefined>): (req: Request, res: Response, next: NextFunction) => Promise<T | undefined> {
    return async (req: Request, res: Response, next: NextFunction): Promise<T | undefined> => {
        try {
            return await fn(req, res, next);
        } catch (error) {
            next(error);
            return undefined;
        }
    }
}


// export default async function asyncWrapper<T>(promise: Promise<T>): Promise<[T | undefined, unknown | undefined ]> {
//     try {
//         return [await promise, undefined];
//     } catch (error) {
//         return [undefined, error];
//     }
// }
