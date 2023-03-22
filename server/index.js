import express from "express";
import config from "config";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import userRouter from "./routes/index.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = config.get('serverPort');

const start = () =>{
   try{

      try {
         db.authenticate();
         console.log('Database connected...');
     } catch (error) {
         console.error('Connection error:', error);
     }

     app.use(cors({ credentials: true, origin:'http://localhost:3000' }));
     app.use(cookieParser());
     app.use(express.json());
     app.use(userRouter);

   
      app.listen(PORT, () => console.log('Server started on port', PORT));
   } catch (e) {

   }
}

start();