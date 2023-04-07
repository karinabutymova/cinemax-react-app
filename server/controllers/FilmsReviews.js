import FilmReviews from "../models/filmReview.js";
import User from "../models/userModel.js";

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
   let { filmId } = req.query;
   try {
      const allRewiews = await FilmReviews.findAll({
         where: {
            film_id: filmId
         },
         attributes: { exclude: ['reviews_user.password'] },
         include: {
            model: User,
            as: 'reviews_user',
            required: true,
            attributes: { exclude: ['password', 'refresh_token', 'email'] }
         },
         raw: true,
         order: [
            ['created_at', 'DESC']
         ]
      });
      res.json(allRewiews);

   } catch (error) {
      console.log(error);
   }
}