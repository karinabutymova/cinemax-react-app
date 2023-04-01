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

export const SetUserWishlist = async (req, res) => {
   let { filmId, userId } = req.query;
   console.log(req.query);
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