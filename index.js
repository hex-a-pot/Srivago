import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import auth from './routes/auth.js'
import hotels from './routes/hotels.js'
import rooms from './routes/rooms.js'
import users from './routes/users.js'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
const mongoDb = process.env.MONGO_DB_URI;

const connectDB = async()=>{
    try{
        await mongoose.connect(mongoDb);
        console.log("Database connected!!");
    }
    catch(err)
    {
        throw err;
    }
    
}

mongoose.connection.on("disconnected",()=>{
    console.log("Database connection interrupted !!")
})

// MIDDLEWARES
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',auth);
app.use('/api/hotels',hotels);
app.use('/api/rooms',rooms);
app.use('/api/users',users);

// MIDDLEWARE error handling

app.use((err,req,res,next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong"
    
    res.status(errStatus).json({
        success : false,
        status : errStatus,
        message : errMessage,
        stack : err.stack
    })
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`server is listening on ${PORT}!`);
})