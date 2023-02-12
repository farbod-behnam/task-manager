import mongoose, { DocumentDefinition, Schema, Types } from "mongoose";
import { Service } from "typedi";

export interface ITask extends mongoose.Document {
    name: string,
    completed: boolean
}

const TaskSchema = new Schema<ITask>({
    name: {
        type: String, 
        required: [true, "must provide name"], 
        trim: true, 
        maxlength: [20, "name cannot be more than 20 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model<ITask>("Task", TaskSchema);

// export default mongoose.model<ITask>("Task", TaskSchema);

export interface TaskRepository<T> {
    hi: (name: string) => string;
    // create: (doc: T | DocumentDefinition<T>) => Promise<T>;
}

@Service()
export class MongoTaskRepository implements TaskRepository<ITask> {
    hi = (name: string): string => {
        return "hello from MongoTaskRepository" + name;
    }



}

export default Task;