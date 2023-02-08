import express, { Request, Response } from "express";
import Container from "typedi";
import { TasksController } from "../controllers/tasks.controller";

const tasksRouter = express.Router();

const tasksController = Container.get(TasksController);

tasksRouter.get("/", (req: Request, res: Response) => tasksController.getAllTasks(req, res));


export default tasksRouter;