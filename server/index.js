import express from "express";
import config from "config";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import {
   userRouter,
   forgotPasswordRouter,
   filmsRouter,
   filmsWishlistRouter,
   filmReviewsRouter,
   filmRatingRouter,
   newsRouter,
   filmsShowsRouter,
   ticketsRouter,
   userBonusesRouter,
   seatsRouter,
   orderRouter,
   hallRouter
} from "./routes/index.js";
import cors from "cors";
import multer from "multer";

dotenv.config();
const app = express();
const PORT = config.get('serverPort');

const start = () => {
   try {
      try {
         db.authenticate();
         console.log('Database connected...');
      } catch (error) {
         console.error('Connection error:', error);
      }

      app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
      app.use(cookieParser());
      app.use(express.json());
      app.use(userRouter);
      app.use(forgotPasswordRouter);
      app.use(filmsRouter);
      app.use(filmsWishlistRouter);
      app.use(filmReviewsRouter);
      app.use(filmRatingRouter);
      app.use(newsRouter);
      app.use(filmsShowsRouter);
      app.use(ticketsRouter);
      app.use(userBonusesRouter);
      app.use(seatsRouter);
      app.use(orderRouter);
      app.use(hallRouter);

      var storage = multer.diskStorage({
         destination: function (req, file, cb) {
            cb(null, '../client/src/assets/images/Posters')
         },
         filename: function (req, file, cb) {
            cb(null, file.originalname)
         }
      })

      var upload = multer({ storage: storage }).single('file');

      app.post('/uploadImg', function (req, res) {

         upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
            } else if (err) {
               return res.status(500).json(err)
            }
            return res.status(200).send(req.file)

         })

      });

      app.listen(PORT, () => console.log('Server started on port', PORT));
   } catch (e) {

   }
}

start();