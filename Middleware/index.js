import express from 'express';

const app = express()
const port  = 3000;
let numberofReq = 0
let currentTime = 0

app.use(express.json()) // use to parse body in the post req 

//middlewares
function userMiddleware(req,res,next){
    const username = req.headers.username
    const password = req.headers.password

    if(username !== "Bhushan" || password !== "pass"){
        res.status(413).json({msg : "User not Found"})
        return ; 
    }
    else{
        next()
    }

}
function kidneyMiddleware(req,res,next){
    const kidneyId = req.query.kidneyId

    if(kidneyId != 1 && kidneyId != 2){
        res.status(413).json({msg : "Invalid Input"})
        return ; 
    }
    else{
        next()
    }

}
function calculateRequest(req,res,next){
    numberofReq++;
    console.log(numberofReq);
    next()
}
function startTimeReq(req,res,next){
    currentTime =  new Date().getTime();
    next()
}
function calculateRequestTime(){
    let totalRequestTime =  new Date().getTime() - currentTime
    console.log(totalRequestTime,"ms")
}
// app.use(calculateRequest)

function kidneyValidation(req,res,next){
    const kidneys = req.body.kidneys
    if(!(Array.isArray(kidneys))){
        res.status(411).json({msg:`Invalid Input ${typeof kidneys}`}) 
    }
    else{
        next()  
    }

}
app.get("/health-checkup",userMiddleware,kidneyMiddleware,function(req,res){
    res.json({msg:"Hey ur healthy"})
})
app.get("/kidney-checkup",userMiddleware,kidneyMiddleware,function(req,res){
    res.json({msg:"Kidney is fine bro"})
})
app.get("/heart-checkup",userMiddleware,kidneyMiddleware,function(req,res){
    res.json({msg:"Heart is fine bro"})
})
app.get("/",startTimeReq,function(req,res){
    res.send("Welcome to my hospital")
    calculateRequestTime()
})
// kidneyValidation,
app.post("/kidney",function(req,res){
    const kidneys = req.body.kidneys;
    res.json({
        msg:`You have ${kidneys.length} kidneys`
    })
})
// global catches 
app.use(function(err,req,res,next){
    res.status(500).json({
        msg:"Sorry something went worng"
    })
})
app.listen(port,()=>{
    console.log("The app is listening at http://localhost:3000")
})
