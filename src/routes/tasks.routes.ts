import express, { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { TasksController } from "../controllers/tasks.controller";
import asyncWrapperPrototype from "../middleware/async-wrapper";

const tasksRouter = express.Router();

const tasksController = Container.get(TasksController);

tasksRouter.get("/", asyncWrapperPrototype((req: Request, res: Response) => tasksController.getAllTasks(req, res)));
tasksRouter.post("/", asyncWrapperPrototype((req: Request, res: Response) => tasksController.createTask(req, res)));
tasksRouter.get("/:id", asyncWrapperPrototype((req: Request, res: Response, next: NextFunction) => tasksController.getTask(req, res, next)));
tasksRouter.patch("/:id", asyncWrapperPrototype((req: Request, res: Response, next: NextFunction) => tasksController.updateTask(req, res, next)));
tasksRouter.delete("/:id", asyncWrapperPrototype((req: Request, res: Response) => tasksController.deleteTask(req, res)));



export default tasksRouter;