import FilmsShows from "../models/filmsShowsModel.js";
import db from "../config/database.js";
import Halls from "../models/hallsModel.js";
import { Op } from "sequelize";

export const GetAllFilmShows = async (req, res) => {
   let { filmId } = req.query;
   try {
      const allShows = await FilmsShows.findAll({
         where: {
            [Op.and]: [{
               film_id: filmId
            }, {
               film_datetime: {
                  [Op.gt]: new Date()
               }
            }]
         },
         order: [
            ['film_datetime', 'ASC'],
         ]
      });
      res.json(allShows);

   } catch (error) {
      console.log(error);
   }
}

export const GetShowHalls = async (req, res) => {
   let { filmId, showDate } = req.query;
   try {
      const allShows = await FilmsShows.findAll({
         where: {
            [Op.and]: [{
               film_id: filmId
            }, {
               film_datetime: {
                  [Op.gt]: new Date()
               }
            }, {
               film_datetime: {
                  [Op.substring]: showDate
               }
            }]
         },
         include: {
            model: Halls,
            as: 'halls',
            // required: true
         },
         raw: true,
      });
      res.json(allShows);

   } catch (error) {
      console.log(error);
   }
}

