import FilmWishlist from "../models/filmWishlist.js";


export const GetUserWishlist = async (req, res) => {
   try {
      const userWishlist = await FilmWishlist.findAll({
         where: {
            user_id: req.query.userId
         }
      });
      res.json(userWishlist);
   } catch (error) {
      console.log(error);
   }
}

export const GetFilmInWishlist = async (req, res) => {
   try {
      const filmWishlist = await FilmWishlist.findOne({
         where: {
            user_id: req.query.userId,
            film_id: req.query.filmId
         }
      });
      res.json(filmWishlist);
   } catch (error) {
      console.log(error);
   }
}

export const DeleteUserWishlist = async (req, res) => {
   let { wishId } = req.query;
   try {
      const userWishlist = await FilmWishlist.destroy({
         where: {
            id: wishId
         }
      });
      res.json(userWishlist);

   } catch (error) {
      console.log(error);
   }
}

export const DeleteWishlistByUser = async (req, res) => {
   let { userId, filmId } = req.query;
   try {
      const userWishlist = await FilmWishlist.destroy({
         where: {
            user_id: userId,
            film_id: filmId
         }
      });
      res.json(userWishlist);

   } catch (error) {
      console.log(error);
   }
}

export const SetUserWishlist = async (req, res) => {
   let { filmId, userId } = req.query;
   try {
      const userWishlist = await FilmWishlist.create({
         user_id: userId,
         film_id: filmId
      });
      res.json(userWishlist);
   } catch (error) {
      console.log(error);
   }
}
