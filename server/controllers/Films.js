import Film from "../models/filmModel.js";
import { Op } from "sequelize";
import db from "../config/database.js";


export const GetFilms = async(req, res) => {
   let {filter} = req.query;

   let where = {};
   // let where = '';
   switch (filter) {
      case 'now':
         where = {
            [Op.and]:[{
               from_rent_date: {
                  [Op.lte]: new Date(),
               }
            },
            {
               to_rent_date: {
                  [Op.gte]: new Date()
               }
            }]
         }

         // where = `(from_rent_date <= ${new Date().toISOString().split('T')[0]}) AND (to_rent_date >= ${new Date().toISOString().split('T')[0]})`;
         break;

      case 'soon':
         where = {
            from_rent_date: {
               [Op.gt]: new Date()
            }
         }
         // where = `from_rent_date > ${new Date().toISOString().split('T')[0]}`;
         break;
      default: break;
   }
   try {
       const films = await Film.findAll({
         where: where
       });
      //  const [results, metadata] = await db.query(
      //    `SELECT *, AVG(films_rating.rating) AS rate FROM films_rating 
      //       INNER JOIN films ON films_rating.film_id = films.id
      //       WHERE ${where}
      //       GROUP BY films_rating.film_id`
      //  );
       
      //  console.log(JSON.stringify(results, null, 2));
      //  console.log(JSON.stringify(films, null, 2));

       res.json(films);
   } catch (error) {
       console.log(error);
   }
}