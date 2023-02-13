import { NextFunction, Request, Response } from "express";
import { nextTick } from "process";
import { Inject, Service } from "typedi";
import Logging from "../library/Logging";
import { CustomError } from "../models/custom-error.model";

import Task, { ITask, MongoTaskRepository, TaskRepository } from "../models/task.model";


@Service()
export class TasksController {

    @Inject(() => MongoTaskRepository)
    private readonly taskRepository!: TaskRepository<ITask>;


    constructor(taskRepository: TaskRepository<ITask>) {
        this.taskRepository = taskRepository;
    }

    async getAllTasks(req: Request, res: Response) {

            const tasks = await Task.find({});
            res.status(200).json({ tasks: tasks });

    }

    async createTask(req: Request, res: Response) {

            const name = req.body.name;
            const completed = req.body.completed;
            const task = await Task.create({ name: name, completed: completed });


            res.status(201).json({ task });

    }

    async getTask(req: Request, res: Response, next: NextFunction) {

            const taskId = req.params.id;
            const task = await Task.findOne({ _id: taskId });

            if (task === null) {
                const error = new CustomError(400, "bad request", "No task with id: " + taskId);
                Logging.error(error);
                return next(error);
            }

            res.status(200).json({ task });

    }

    async updateTask(req: Request, res: Response, next: NextFunction) {

            const taskId = req.params.id;
            const taskName = req.body.name;
            const taskIsCompleted = req.body.completed;
            const task = await Task.findOneAndUpdate({ _id: taskId }, { name: taskName, completed: taskIsCompleted }, {
                new: true, 
                runValidators: true
            });


            if (task === null) {
                const error = new CustomError(400, "bad request", "No task with id: " + taskId);
                Logging.error(error);
                return next(error);
            }

            res.status(200).json({ task })

    }

    async deleteTask(req: Request, res: Response) {
        // try {
            const taskId = req.params.id;
            const task = await Task.findOneAndDelete({ _id: taskId });

            if (task === null) {
                Logging.error("No task with id: " + taskId);
                return res.status(400).json({ msg: "No task with id: " + taskId });
            }

            res.status(200).json({ task })

        // } catch (error) {
        //     Logging.error(error);
        //     res.status(500).json({ msg: error })
        // }
    }

}