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

export const GetAllFilmsShowsAdmin = async (req, res) => {
   try {
      const [allShows] = await db.query(
         `SELECT films_shows.id, films_shows.film_datetime, halls.hall_title,
         films.film_title, films_shows.price, films_shows.id AS delete_id
         FROM films_shows
         INNER JOIN halls
         ON halls.id = films_shows.hall_id
         INNER JOIN films
         ON films.id = films_shows.film_id
         ORDER BY films_shows.id`
      );
      res.json(allShows);

   } catch (error) {
      console.log(error);
   }
}

export const DeleteFilmShowById = async (req, res) => {
   try {
      await FilmsShows.destroy({
         where: {
            id: req.query.id
         }
      });
      res.json({
         "message": "Сеанс удалён"
      });
   } catch (error) {
      res.json({ message: error.message });
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

