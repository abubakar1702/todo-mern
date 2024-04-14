import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todo:{
        type: String,
        required: true
    },
    isDone:{
        type:Boolean
    }
})

export default mongoose.model("todos", todoSchema)