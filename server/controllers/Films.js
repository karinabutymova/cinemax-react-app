import Film from "../models/filmModel.js";
import { Op } from "sequelize";

export const GetFilms = async(req, res) => {
   let {filter} = req.query;

   let where = {};
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
         break;

      case 'soon':
         where = {
            from_rent_date: {
               [Op.gt]: new Date()
            }
         }
         break;
      default: break;
   }
   try {
       const films = await Film.findAll({
         where: where
       });
       res.json(films);
   } catch (error) {
       console.log(error);
   }
}