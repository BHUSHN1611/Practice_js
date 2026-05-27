import express, { response } from 'express';
import zod from 'zod'
const app = express()
const port  = 3000;

const Myschema = zod.array(zod.number())
const schema = zod.object({
    email:zod.string(),
    password:zod.string(),
    country:zod.literal("IN").or(zod.literal("US")),
    kidney:zod.array(zod.number())
})

app.use(express.json())

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
app.listen(port,()=>{
    console.log("The app is listening at http://localhost:3000")
})

