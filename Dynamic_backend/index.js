import express from 'express';
import jwt from "jsonwebtoken";

const app = express()
const port  = 3000

app.use(express.json()) // to access body 

const ALL_USERS = [
    {
        username:"bhushan",
        email:"bhushan@gmail.com",
        password:"123"
    },
    {
        name:"roshan",
        email:"roshan@gmail.com",
        password:"456"
    }
]
// function userExists(username,password){
//     let userExists = false;
//     for (let index = 0; index < ALL_USERS.length; index++) {
//         if(ALL_USERS[index].username == username && ALL_USERS[index].password == password){
//             userExists = true
//         }
//     }
//     return userExists
// }
function userExists(username,password){
    const userExists = ALL_USERS.find((item)=>{
        return (item.username == username && item.password == password)
    })
    return userExists
}
app.post("/signin",function(req,res){
    const username = req.body.username
    const password = req.body.password

    if(!userExists(username,password)){
        return res.status(403).json({
            msg:"User doesnt exists"
        });
    }
    var token = jwt.sign({username:username},"123456")
    return res.json({
        token
    })
})

app.get("/users",(req,res)=>{
    const token = req.headers.authorization;
    try{
        const decodedToken = jwt.verify(token,"123456")
        const username = decodedToken.username
        if(!decodedToken){
            return res.json({
                msg:"Invalid token"
            })
        }
        return res.json({users:ALL_USERS})
    }
    catch(err){
        return res.status(403).json({
            msg:"Invalid token"
        })
    }
})
app.listen(port)

