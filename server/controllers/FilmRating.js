import FilmRating from "../models/filmRating.js";
import db from "../config/database.js";
import Film from "../models/filmModel.js";

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

export const DeleteRatingByUser = async (req, res) => {
   let { filmId, userId } = req.query;

   try {
      let rate = await FilmRating.findOne({
         where: {
            film_id: filmId,
            user_id: userId
         }
      });

      if (rate) {
         await FilmRating.destroy({
            where: {
               id: rate.id
            }
         });
         res.json({
            "message": "Оценка удалена"
         });
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

export const GetAllRatingByUser = async (req, res) => {
   let { userId } = req.query;

   try {
      const getAllUserRating = await FilmRating.findAll({
         where: {
            user_id: userId
         },
         attributes: {
            include: ['rating']
         },
         include: {
            model: Film,
            as: 'ratings',
            required: true,
            attributes: ['film_title']
         },
         raw: true
      })
      res.json(getAllUserRating);
   } catch (error) {
      console.log(error);
   }
}