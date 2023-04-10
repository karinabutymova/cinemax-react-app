import FilmRating from "../models/filmRating.js";
import db from "../config/database.js";

export const SetRatingByUser = async (req, res) => {
   let { filmId, userId, rating } = req.query;

   try {
      let isExist = await FilmRating.findOne({
         where: {
            film_id: filmId,
            user_id: userId
         }
      });

      if (!isExist) {
         let setRating = await FilmRating.create({
            film_id: filmId,
            user_id: userId,
            rating: rating
         });

         res.json(setRating);
      } else {
         let setRating = await FilmRating.update({ rating: rating }, {
            where: {
               film_id: filmId,
               user_id: userId
            }
         });

         res.json(setRating);
      }
   } catch (error) {
      console.log(error);
   }
}

export const GetRatingByUser = async (req, res) => {
   let { filmId, userId } = req.query;

   try {
      const getUserRating = await FilmRating.findOne({
         where: {
            film_id: filmId,
            user_id: userId
         },
         attributes: {
            include: ['rating']
         }

      })
      res.json(getUserRating);
   } catch (error) {
      console.log(error);
   }
}