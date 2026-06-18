import express, { response } from 'express';
import zod, { regex } from 'zod'
const app = express()
const port  = 4000;

const Myschema = zod.array(zod.number())
const schema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(8),
    country:zod.literal("IN").or(zod.literal("US")),
    kidney:zod.array(zod.number())
})
const loginSchema = zod.object({
    email:zod.string().email(),
    password:zod.string().min(8)
})

app.use(express.json())



app.get("/getkidney",(req,res)=>{
    res.json(kidneys)
})

app.use(function(err,req,res,next){
    res.status(500).json({msg:"Internal Error"})
})

app.post("/health-checkup",function(req,res){
    const {email,password,country,kidney} = req.body;
    const response = schema.safeParse({email,password,country,kidney})
    if(response.success){
        res.json({response})
    }
    else{
        res.status(401).json({msg:"Invalid input"})
    }
})

app.get("/",function(req,res){
    res.send("Hello")
})

app.post("/login",(req,res)=>{
    const {email,password} = req.body
    const response = loginSchema.safeParse({email,password})
    if(response.success){
        res.status(200).json({msg:"Login successfully"})
    }
    else{
        res.status(401).json({msg:"Invalid input"})
    }

})
app.listen(port,()=>{
    console.log("The app is listening at http://localhost:3000")
})


