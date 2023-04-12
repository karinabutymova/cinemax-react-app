import FilmReviews from "../models/filmReview.js";
import User from "../models/userModel.js";
import Film from "../models/filmModel.js";
import db from "../config/database.js";

export const SetFilmReview = async (req, res) => {
   let { userId, textReview, filmId } = req.query;
   try {
      const userReview = await FilmReviews.create({
         user_id: userId,
         film_id: filmId,
         review_text: textReview,
         created_at: new Date().toString()
      });
      res.json(userReview);
   } catch (error) {
      console.log(error);
   }
}

export const GetAllFilmReviews = async (req, res) => {
   let { filmId, userId } = req.query;
   try {
      const allRewiews = await FilmReviews.findAll({
         where: {
            film_id: filmId
         },
         include: {
            model: User,
            as: 'reviews_user',
            required: true,
            attributes: { exclude: ['password', 'refresh_token', 'email'] }
         },
         raw: true,
         order: [
            db.literal(`case when films_reviews.user_id ='${userId}' then 0 else 1 end`),
            ['created_at', 'DESC'],

         ]
      });
      res.json(allRewiews);

   } catch (error) {
      console.log(error);
   }
}

export const GetAllUserReviews = async (req, res) => {
   let { userId } = req.query;
   try {
      const allUserRewiews = await FilmReviews.findAll({
         where: {
            user_id: userId
         },
         include: {
            model: Film,
            as: 'reviews_film',
            required: true,
            attributes: ['film_title']
         },
         raw: true,
         order: [
            ['created_at', 'DESC']
         ]
      });

      res.json(allUserRewiews);
   } catch (error) {
      console.log(error);
   }
}