import mongoose from "mongoose"

const todoSchema = mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean

})

export const todo = mongoose.model("Todos",todoSchema)