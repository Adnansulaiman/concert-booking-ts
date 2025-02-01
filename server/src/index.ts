// const express = require('express');
// require('dotenv').config();
import express,{Express,Response,Request} from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.config';
import cors from 'cors';

import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import concertRoutes from './routes/concert.routes'

dotenv.config()

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

app.get('/', (req:Request, res:Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});