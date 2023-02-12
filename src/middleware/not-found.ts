import { Request, Response } from "express";

export default function notFound (req: Request, res: Response) {
    res.status(400).json("Route is not allowed");
}
