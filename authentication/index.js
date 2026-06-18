import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const mongoDburl = "mongodb+srv://bhushanjadhav1603_db_user:bhushanjadhav1603_db_user@cluster0.eteefvy.mongodb.net/?appName=Cluster0"

const app = express()
const port = 4000

app.use(express.json())

app.listen(port)