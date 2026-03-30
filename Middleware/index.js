import express from 'express';

const app = express()
const port  = 3000

app.get("/",function(req,res){
    res.send("Hey i mak ")

})

app.listen(port,()=>{
    console.log("The app is listening at http://localhost:3000")
})