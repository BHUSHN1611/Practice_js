import express from 'express';

const app = express()
const port  = 3000;
let reqcount = 0

let numberOfRequestsForUser = {}
// setInterval(()=>{
//     numberOfRequestsForUser = {}
// },1000)
// app.use((req,res,next)=>{
//     const userId = req.headers["user_id"]
//     if(numberOfRequestsForUser[userId]){
//         numberOfRequestsForUser[userId] += 1
//         if(numberOfRequestsForUser[userId]<6){
//             res.status(429).json({msg:"Blocked"})
//         }
//         else{
//             next()
//         }
//     }
//     else{
//         numberOfRequestsForUser[userId] = 1
//         next()
//     }
// })
// app.use(requestCounter)
let errorCount = 0;

// Error-handling middleware
app.use((err, req, res, next) => {
    errorCount += 1;
    res.status(500).json({
        msg: "An error happened",
        error: err.message,   // show what went wrong
        errorCount
    });
});


//middlewares



function requestCounter(req,res,next){
    reqcount ++
    next()
}
function ticketChecker(req,res,next){
    const ticket = req.query.ticket
    if(ticket == "free"){
        next()
    }
    else{
        res.status(403).send("Not allowed")
    }
    
}
function ageChecker(req,res,next){
    const age = req.query.age
    if (age>=14){
        next()
    }
    else{
        res.status(411).json({
            msg:"sorry no entry,age is small"
        })  
    }
}


//routes 

app.get("/ride1",ticketChecker,ageChecker,(req,res)=>{
  res.status(200).json({msg:"enjoy ride1"})  
})

app.get("/ride2",(req,res)=>{
    res.send("enjoy ride 2")
})
app.get("/ride3",(req,res)=>{
    res.send("enjoy ride 3")
})
app.get("/",function(req,res){
    throw new Error("Some errors")
})

app.get("/reqno",(req,res)=>{
    res.status(200).json({
        reqcount,
        msg:"hey"
    })
})

app.listen(port,()=>{
    console.log("The app is listening at http://localhost:3000")
})
// function rateLimiter(req,res,next){
//     const userId = req.headers['user-id']
//     if(!numberOfRequestsForUser[userId]){
//         numberOfRequestsForUser[userId] = 1
//         next()
//     }
//     else{
//         numberOfRequestsForUser[userId] += 1
//         if(numberOfRequestsForUser[userId]<5){
//             next()
//         }
//         else{
//             res.status(429).json({msg:"Your blocked"})
//         }
//     }
// }