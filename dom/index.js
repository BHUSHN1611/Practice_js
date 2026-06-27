import express from 'express';
import cors from "cors"

const app = express()
const port  = 3000
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get("/sum",(req,res)=>{

    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)

    res.json({ sum: a + b });
})

app.get("/interest",(req,res)=>{
  const principal = parseInt(req.query.principal)
  const rate = parseInt(req.query.rate)
  const time = parseInt(req.query.time)

  const interest = (principal*rate*time)/100
  const totalAmount = interest + principal

  res.send({totalAmount,interest})
})
app.listen(port)