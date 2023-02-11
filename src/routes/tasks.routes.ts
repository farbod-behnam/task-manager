import express, { Request, Response } from "express";
import Container from "typedi";
import { TasksController } from "../controllers/tasks.controller";

const tasksRouter = express.Router();

const tasksController = Container.get(TasksController);

tasksRouter.get("/", (req: Request, res: Response) => tasksController.getAllTasks(req, res));
tasksRouter.post("/", (req: Request, res: Response) => tasksController.createTask(req, res));
tasksRouter.get("/:id", (req: Request, res: Response) => tasksController.getTask(req, res));
tasksRouter.patch("/:id", (req: Request, res: Response) => tasksController.updateTask(req, res));
tasksRouter.delete("/:id", (req: Request, res: Response) => tasksController.deleteTask(req, res));



export default tasksRouter;