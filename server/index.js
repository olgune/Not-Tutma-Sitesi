import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import notesRoute from './routes/notesRoute.js';
import authRoute from './routes/authRoute.js';  

dotenv.config({ path: './server/.env' }); 
const corsOptions = {
   origin: process.env.NODE_ENV === 'production' ? 'https://not-tutma-sitesi-five.vercel.app' : 'http://localhost:3001',
   credentials: true,        
};

const app = express();
app.use(cors(corsOptions));    
app.use(express.json());
app.options('*', cors(corsOptions)); 

const port = process.env.PORT || 3000;
const mongoDBURL = process.env.mongoDBURL;

app.use('/notes', notesRoute);
app.use('/auth', authRoute);  

mongoose
   .connect(mongoDBURL)
   .then(() => {
      console.log("App connected to database");
      app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
      });
   })
   .catch((error) => {
      console.log(error);
   });
