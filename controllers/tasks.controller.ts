import { Request, Response } from "express";
import { Service } from "typedi";

@Service()
export class TasksController {

    getAllTasks(req: Request, res: Response) {
        res.send("all items")
    }

}