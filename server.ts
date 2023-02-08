import 'reflect-metadata';

import express, { Request, Response } from "express";
import taskRouter from "./routes/tasks.routes";


const server = express();

server.use(express.json());

server.use("/api/v1/tasks", taskRouter);

server.get("/hello", (req: Request, res: Response) => {
    res.send("Task Manager App");
})


const port = 5000;

server.listen(port, () => {
    console.log("server is listening on port " + port + "....");
});

