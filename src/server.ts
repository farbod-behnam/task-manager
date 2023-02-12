import 'reflect-metadata';

import express, { Request, Response } from "express";

import taskRouter from "./routes/tasks.routes";
import { DatabaseConnection } from './db/DatabaseConnection';
import dotenv from "dotenv";
import Logging from './library/Logging';
import notFound from './middleware/not-found';
import errorHandler from './middleware/error-handler';



const server = express();

// Middleware
server.use(express.static("./public"));
server.use(express.json());

// Routes
server.use("/api/v1/tasks", taskRouter);

server.use("*", notFound);
server.use(errorHandler);

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
        Logging.info("> Database connection established...");


        server.listen(port, () => Logging.info("> Server is listening on port " + port + "..."));
    } catch (error) {
        Logging.error(error);
    }
}

start();

