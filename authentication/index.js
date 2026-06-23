import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const app = express()
const port = 4000
const jwtpassword = "123456"

app.use(express.json())

mongoose.connect("mongodb+srv://bhushan:Bhushan123@cluster0.k3daqiw.mongodb.net/")
// CRUD 
// Create , update ,delete , rename 

const User = mongoose.model('Users',{name: String,email:String,password:String})

app.post("/signup",async (req,res)=>{
    const {username, email , password} = req.body

    const existingUser = await User.findOne({email:email})
    
    if(!existingUser){
        const user = new User({name:username,password,email})
        user.save()
        var token = jwt.sign({username:username},jwtpassword)
        return res.status(200).json({msg:"User sign in successfully",token})
    }
    return res.status(401).json({msg:"User already exists"})
    
})

app.get("/login",(req,res)=>{
    const token = req.headers.authorization
    const decodedToken = jwt.verify(token,jwtpassword)
    if(decodedToken){
        return res.json({msg:"Hey",username:decodedToken.username})
    }
    return res.json({msg:"Invalid token"})
})




app.listen(port)