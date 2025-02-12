import dotenv from 'dotenv';
dotenv.config()
// const express = require('express');
// require('dotenv').config();
import express,{Express,Response,Request} from 'express';
import connectDB from './config/db.config';
import cors from 'cors';

import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import concertRoutes from './routes/concert.routes'
import upcomingRoutes from './routes/upcoming.routes'


console.log(process.env.CLOUD_API_KEY)
const app:Express = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());


connectDB();

//Routes
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/concert',concertRoutes);
app.use('/api/upcoming',upcomingRoutes);

app.get('/', (req:Request, res:Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});