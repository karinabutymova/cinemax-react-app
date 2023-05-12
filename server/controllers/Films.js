import Film from "../models/filmModel.js";
import FilmRating from "../models/filmRating.js";
import { Op } from "sequelize";
import db from "../config/database.js";

export const GetAllFilms = async (req, res) => {
   try {
      const films = await Film.findAll({
         attributes: {
            include: [['id', 'delete_id']]
         }
      });
      res.json(films);
   } catch (error) {
      console.log(error);
   }
}

export const GetPopularFilm = async (req, res) => {
   try {
      const [films] = await db.query(
         `SELECT films.id, films.film_title, films.photo_path, films.genres,
         films.to_rent_date, films.from_rent_date
         FROM tickets
         INNER JOIN films_shows
         ON tickets.film_show_id = films_shows.id
         INNER JOIN films
         ON films.id = films_shows.film_id
         GROUP BY films.id
         ORDER BY COUNT(films.id) DESC
         LIMIT 3`
      );

      res.json(films);
   } catch (error) {
      console.log(error);
   }
}

export const GetFilmTitles = async (req, res) => {
   try {
      const films = await Film.findAll({
         attributes: ['id', 'film_title', 'from_rent_date', 'to_rent_date', 'film_runtime']
      });

      res.json(films);
   } catch (error) {
      console.log(error);
   }
}

export const GetBestRateFilms = async (req, res) => {
   try {
      let check_date = new Date().toISOString().split('T')[0];
      const [films] = await db.query(
         `SELECT films.id, films.film_title, films.photo_path, films.genres,
         films.to_rent_date, films.from_rent_date, AVG(films_rating.rating) as rate
         FROM films_rating
         INNER JOIN films
         ON films.id = films_rating.film_id
         WHERE (films.from_rent_date <= "${check_date}") AND (films.to_rent_date >= "${check_date}")
         GROUP BY films.id
         ORDER BY rate DESC
         LIMIT 5`
      );

      res.json(films);
   } catch (error) {
      console.log(error);
   }
}

export const GetSoonFilms = async (req, res) => {
   try {
      const films = await Film.findAll({
         attributes: ['id', 'film_title', 'genres', 'from_rent_date', 'to_rent_date', 'photo_path'],
         where: {
            from_rent_date: {
               [Op.gt]: new Date()
            }
         },
         order: [['from_rent_date', 'ASC']],
         limit: 4
      })

      res.json(films);
   } catch (error) {
      console.log(error);
   }
}

export const AddFilm = async (req, res) => {
   let { title,
      poster,
      description,
      actors,
      creators,
      year,
      genres,
      country,
      runtime,
      age,
      fromRent,
      toRent,
      trailer
   } = req.body.newFilm;
   try {
      const film = await Film.create({
         film_title: title,
         photo_path: poster,
         description: description,
         film_runtime: runtime,
         creators: creators,
         actors: actors,
         year: year,
         genres: genres,
         country: country,
         from_rent_date: fromRent,
         to_rent_date: toRent,
         age_limit: age,
         trailer_link: trailer
      });
      res.json(film);
   } catch (error) {
      console.log(error);
   }
}

export const DeleteFilmById = async (req, res) => {
   try {
      await Film.destroy({
         where: {
            id: req.query.id
         }
      });
      res.json({
         "message": "Фильм удалён"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
}

export const GetFilmById = async (req, res) => {
   let { filmId } = req.query;

   try {
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