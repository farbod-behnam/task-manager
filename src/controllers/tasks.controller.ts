import { Request, Response } from "express";
import { Service } from "typedi";
import Logging from "../library/Logging";

import Task, { ITask } from "../models/task.model";


@Service()
export class TasksController {

    async getAllTasks(req: Request, res: Response) {
        try {
            const tasks = await Task.find({});
            res.status(200).json({ tasks:tasks })
        } catch (error) {
            Logging.error(error);
            res.status(500).json({msg:error})
        }
    }

    async createTask(req: Request, res: Response) {
        try {
            const name = req.body.name;
            const completed = req.body.completed;
            const task = await Task.create(req.body);
    
    
            res.status(201).json({task});
        } catch (error) {
            Logging.error(error);
            res.status(500).json({msg:error})
        }

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