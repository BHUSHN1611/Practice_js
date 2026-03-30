import express from 'express';

const app = express();
const port = 3000;

app.use(express.json())
const users = [{
    name:"Bhushan",
    kidneys : [{
        healthy:true
    }]
}]
function isThereatleastUnhealtykidney(){
    let isthereisunhealtykidney = false
    for(let i = 0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            isthereisunhealtykidney = true
        }
    }
    return isthereisunhealtykidney
}
app.get("/",function(req,res){
    const userkidney = users[0].kidneys;
    const numberOfKidney = userkidney.length;
    let numberOfHealthyKidney = 0;
    for (let i = 0 ; i < numberOfKidney ; i++){
        if (userkidney[i].healthy){
            numberOfHealthyKidney = numberOfHealthyKidney + 1;
        }
    } 
    const numbereofUnhealthykidney = numberOfKidney - numberOfHealthyKidney
    res.json({
       numberOfKidney,
        numberOfHealthyKidney,
        numbereofUnhealthykidney
    })

})
app.post("/",function(req,res){
    const isHealthy = req.body.isHealthy
    users[0].kidneys.push({healthy:isHealthy})
    res.json({msg:"Done"})
    

})
app.put("/",function(req,res){
    if(isThereatleastUnhealtykidney()){
        for(let i = 0;i<users[0].kidneys.length;i++){
            users[0].kidneys[i].healthy = true
        }
        res.json({msg:"Done"})
    }
    else{
        res.status(411).json({msg:"No bad kidney present"})
    }
    

})
app.delete("/",function(req,res){
    if(isThereatleastUnhealtykidney()){
        const Newkidney  = []
        for(let i = 0;i<users[0].kidneys.length;i++){
            if(users[0].kidneys[i].healthy){
                Newkidney.push({
                    healthy:true
                })
            }
        }
        users[0].kidneys = Newkidney
        res.json({msg:"Done"})
    }
    else{
        res.status(411).json({
            msg : "No bad kidney present"
        })
    }
    



})
app.listen(port,()=>{
    console.log("App is listening http://localhost:3000")
})