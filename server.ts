import 'reflect-metadata';

import express, { Request, Response } from "express";

import taskRouter from "./routes/tasks.routes";
import { DatabaseConnection } from './db/DatabaseConnection';
import dotenv from "dotenv";



const server = express();

// Middleware
server.use(express.json());

// Routes
server.use("/api/v1/tasks", taskRouter);

server.get("/hello", (req: Request, res: Response) => {
    res.send("Task Manager App");
})


// 
const port = 5000;

const databaseConnection = new DatabaseConnection();
dotenv.config();


const start = async () => {
    try {
        const uri = process.env.LOCAL_MONGO_URI;

        if (uri === undefined) {
            throw new Error("undefined environment parameter");
        }

        await databaseConnection.connect(uri);
        console.log("> Database connection established...");

        server.listen(port, () => console.log("> Server is listening on port " + port + "..."));
    } catch (error) {
        console.log(error);
    }
}

start();

