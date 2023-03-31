import Film from "../models/filmModel.js";
import { Op } from "sequelize";
import db from "../config/database.js";


export const GetFilms = async(req, res) => {
   let {filter} = req.query;

   let where = '';
   let check_date = new Date().toISOString().split('T')[0];
   switch (filter) {
      case 'now':
         where = `(from_rent_date <= "${check_date}") AND (to_rent_date >= "${check_date}")`;
         break;

      case 'soon':
         where = `from_rent_date > "${check_date}"`;
         break;
      default: break;
   }
   try {
       const [films] = await db.query(
         `SELECT *, AVG(films_rating.rating) AS rate FROM films_rating 
            RIGHT JOIN films ON films_rating.film_id = films.id
            WHERE ${where}
            GROUP BY films_rating.film_id`
       );

       res.json(films);
   } catch (error) {
       console.log(error);
   }
}