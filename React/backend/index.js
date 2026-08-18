import express from "express";
import { createTodoSchema,completedTodoSchema } from "./types.js";
import { todo } from "./db.js";
import mongoose from "mongoose";
import cors from 'cors'

const app = express()
const port = 3000

app.use(express.json()) // parse the body 
app.use(cors())

app.get("/",(req,res)=>{
    res.send("welcome to simple todo app")
})
app.post("/todo",async (req,res)=>{
    const payload = req.body
    const parsePayload = createTodoSchema.safeParse(payload)
    if(!parsePayload.success){
        res.status(411).json({
            msg:"Invalid input"
        })
        return;
    }
    await todo.create({
        title:payload.title,
        description:payload.description,
        completed:false
    })
    res.json({
        msg:"Todo created"
    })
   
})
app.get("/todos",async (req,res)=>{
    const todos = await todo.find()
    res.json({
        todos : todos
    })
    
})
app.put("/completed",async (req,res)=>{
    const payload = req.body
    console.log(payload)

    const parsePayload = completedTodoSchema.safeParse(payload) 
    console.log(parsePayload)
    
    if(!parsePayload.success){
        console.log(parsePayload.success)
        res.status(411).json({msg:"Invalid id"})
        return;
    }

    const updatedTodo = await todo.updateOne({_id:req.body._id},{completed:true})

    res.json({msg:"Todo marks as completed"})

   
})

app.get("/done",async (req,res)=>{
    const completedTodo = await todo.find({completed:true})
    
    res.json({todos:completedTodo})
})

app.get("/undone",async (req,res)=>{
    const completedTodo = await todo.find({completed:false})
    
    res.json({todos:completedTodo})
})

app.listen(port,()=>{
    mongoose.connect("mongodb+srv://bhushan:Bhushan123@cluster0.k3daqiw.mongodb.net/")
    if(!mongoose){
        console.log("DB is not connnected...")
    }
    console.log("App is listening and DB is connected..")
})