import express from 'express'

import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import curdRoutes from './routes/crudRoutes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/curd",curdRoutes)

const PORT = process.env.PORT || 8080

app.listen (PORT,()=>{
    console.log(`Server is running at ${PORT}`)
    connectDB()
})