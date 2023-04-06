import Film from "../models/filmModel.js";
import FilmRating from "../models/filmRating.js";
import { Op } from "sequelize";
import db from "../config/database.js";
import { response } from "express";


export const GetFilmById = async (req, res) => {
   let { filmId } = req.query;

   try {
      // const film = await Film.findOne({
      //    where: {
      //       id: filmId
      //    }
      // })

      const film = await Film.findOne({
         where: { id: filmId },
         attributes: {
            include: [
               [db.fn('AVG', db.col('films_rating.rating')), 'avg_rating'],
            ]
         },
         include: {
            model: FilmRating,
            as: 'films_rating',
         },
         raw: true,
         group: ['films_rating.film_id'],
      })
      res.json(film);
   } catch (error) {
      console.log(error);
   }
}

export const GetFilms = async (req, res) => {
   let { filter } = req.query;

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

export const FindFilms = async (req, res) => {
   let { searchText } = req.query;
   if (searchText) {
      const films = await Film.findAll({
         attributes: ['id', 'film_title', 'genres', 'from_rent_date', 'to_rent_date', 'photo_path'],
         where: {
            [Op.and]: [{
               [Op.or]: [{
                  film_title: {
                     [Op.substring]: searchText
                  }
               },
               {
                  genres: {
                     [Op.substring]: searchText
                  }
               }],
            }, {
               to_rent_date: {
                  [Op.gt]: new Date()
               }
            }]
         }
      })
      res.json(films);
   } else {
      res.status(404).json('Пустой запрос');
   }

}