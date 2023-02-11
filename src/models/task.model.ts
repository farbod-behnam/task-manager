import mongoose, { Schema, Types } from "mongoose";

export interface ITask extends mongoose.Document {
    name: string,
    completed: boolean
}

const TaskSchema = new Schema<ITask>({
    name: String,
    completed: Boolean
})

export default mongoose.model("Task", TaskSchema);

// export default Task;