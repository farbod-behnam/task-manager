import { Request, Response } from "express";
import { Service } from "typedi";

@Service()
export class TasksController {

    getAllTasks(req: Request, res: Response) {
        res.send("all items from the file")
    }

    createTask(req: Request, res: Response) {
        res.json(req.body);
    }

    getTask(req: Request, res: Response) {
        res.json({ method: "GET", id: req.params.id });
    }

    updateTask(req: Request, res: Response) {
        res.send({ method: "UPDATE", id: req.params.id });
    }

    deleteTask(req: Request, res: Response) {
        res.send("delete task");
    }

}