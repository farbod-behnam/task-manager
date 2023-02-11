import mongoose, { Schema, Types } from "mongoose";

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

export default mongoose.model<ITask>("Task", TaskSchema);

// export default Task;