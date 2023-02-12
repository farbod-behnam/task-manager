import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import Logging from "../library/Logging";

import Task, { ITask, MongoTaskRepository, TaskRepository } from "../models/task.model";


@Service()
export class TasksController {

    @Inject(() => MongoTaskRepository)
    private readonly taskRepository!: TaskRepository<ITask>;


    constructor(taskRepository: TaskRepository<ITask>) {
        this.taskRepository = taskRepository;
    }

    async getAllTasks(req: Request, res: Response) {

        try {

            const tasks = await Task.find({});
            res.status(200).json({ tasks: tasks });
            // res.status(200).json({ tasks: tasks, amount: tasks.length });

        } catch (error) {
            Logging.error(error);
            res.status(500).json({ msg: error });
        }
    }

    async createTask(req: Request, res: Response) {
        try {
            const name = req.body.name;
            const completed = req.body.completed;
            const task = await Task.create({ name: name, completed: completed });


            res.status(201).json({ task });

        } catch (error) {
            Logging.error(error);
            res.status(500).json({ msg: error });
        }

    }

    async getTask(req: Request, res: Response) {
        try {
            const taskId = req.params.id;
            const task = await Task.findOne({ _id: taskId });

            if (task === null) {
                Logging.error("No task with id: " + taskId);
                return res.status(400).json({ msg: "No task with id: " + taskId });
            }

            res.status(200).json({ task });

        } catch (error) {
            Logging.error(error);
            res.status(500).json({ msg: error });
        }
    }

    async updateTask(req: Request, res: Response) {
        try {
            const taskId = req.params.id;
            const taskName = req.body.name;
            const taskIsCompleted = req.body.completed;
            const task = await Task.findOneAndUpdate({ _id: taskId }, { name: taskName, completed: taskIsCompleted }, {
                new: true, 
                runValidators: true
            });

            if (task === null) {
                Logging.error("No task with id: " + taskId);
                return res.status(400).json({ msg: "No task with id: " + taskId });
            }

            res.status(200).json({ task })
        } catch (error) {
            Logging.error(error);
            res.status(500).json({ msg: error });
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const taskId = req.params.id;
            const task = await Task.findOneAndDelete({ _id: taskId });

            if (task === null) {
                Logging.error("No task with id: " + taskId);
                return res.status(400).json({ msg: "No task with id: " + taskId });
            }

            res.status(200).json({ task })

        } catch (error) {
            Logging.error(error);
            res.status(500).json({ msg: error })
        }
    }

}