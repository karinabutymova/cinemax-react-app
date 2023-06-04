import FilmsShows from "../models/filmsShowsModel.js";
import db from "../config/database.js";
import nodemailer from "nodemailer";
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
                  [Op.gt]: new Date().getTime() + 3 * 60 * 60 * 1000
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
         films.film_title, films_shows.price, films_shows.id AS delete_id, films_shows.id AS edit_id
         FROM films_shows
         INNER JOIN halls
         ON halls.id = films_shows.hall_id
         INNER JOIN films
         ON films.id = films_shows.film_id
         ORDER BY films_shows.id DESC`
      );
      res.json(allShows);

   } catch (error) {
      console.log(error);
   }
}

export const GetFilmsShowsById = async (req, res) => {
   let { showId } = req.query;
   try {
      const [shows] = await db.query(
         `SELECT *
         FROM films_shows
         INNER JOIN films
         ON films.id = films_shows.film_id
         INNER JOIN halls
         ON halls.id = films_shows.hall_id
         WHERE films_shows.id = ${showId};`
      );
      res.json(shows);

   } catch (error) {
      console.log(error);
   }
}

export const GetFilmShowsForDate = async (req, res) => {
   let { hall, date } = req.query;
   try {
      const [allShows] = await db.query(
         `SELECT films_shows.hall_id, films_shows.film_datetime, films.film_runtime 
            FROM films_shows
            INNER JOIN films
            ON films.id = films_shows.film_id
            WHERE DATE(films_shows.film_datetime) = '${date}' AND films_shows.hall_id = '${hall}'
            ORDER BY films_shows.film_datetime ASC;`
      );

      res.json(allShows);

   } catch (error) {
      console.log(error);
   }
}

export const DeleteFilmShowById = async (req, res) => {
   try {

      const [users] = await db.query(
         `SELECT users.email, films.film_title, films_shows.film_datetime
         FROM tickets
         INNER JOIN users
         ON tickets.user_id = users.id
         INNER JOIN films_shows
         ON tickets.film_show_id = films_shows.id
         INNER JOIN films
         ON films_shows.film_id = films.id
         WHERE tickets.film_show_id = ${req.query.id}
         GROUP BY users.id;;`
      );
      users.map((user) => {
         const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
               user: `${process.env.EMAIL_ADDRESS}`,
               pass: `${process.env.EMAIL_PASSWORD}`,
            },
         });
         let date = new Date(new Date(user.film_datetime).getTime() - 3 * 60 * 60 * 1000);

         const mailOptions = {
            from: 'Cinemax 🎞 <cinemax@gmail.com>',
            to: `${user.email}`,
            subject: 'Сеанс удалён',
            text:
               `Произошло удаление сеанса ${date} фильма ${user.film_title} \n\n`
               + 'Пожалуйста, перейдите в профиль, чтобы ознакомиться с изменениями:\n\n'
               + `http://localhost:3000/profile\n\n`
         };

         transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
               console.error('there was an error: ', err);
            } else {
               console.log({ success: 'Сообщение отправлено' });
            }
         });
      })

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

export const AddFilmShow = async (req, res) => {
   let { date, hall, film, price } = req.body;
   try {
      const addShow = await FilmsShows.create({
         hall_id: hall,
         film_datetime: new Date(new Date(date).getTime() + 3 * 60 * 60 * 1000),
         film_id: film,
         price: price

      });
      res.json(addShow);

   } catch (error) {
      console.log(error);
   }
}

export const EditFilmShow = async (req, res) => {
   let { date, hall, showId } = req.body;
   try {
      const editShow = await FilmsShows.update({
         hall_id: hall,
         film_datetime: new Date(new Date(date).getTime() + 3 * 60 * 60 * 1000),
      },
         {
            where: {
               id: showId
            }
         });

      const [users] = await db.query(
         `SELECT users.email, films.film_title, films_shows.film_datetime
         FROM tickets
         INNER JOIN users
         ON tickets.user_id = users.id
         INNER JOIN films_shows
         ON tickets.film_show_id = films_shows.id
         INNER JOIN films
         ON films_shows.film_id = films.id
         WHERE tickets.film_show_id = ${showId}
         GROUP BY users.id;;`
      );
      users.map((user) => {
         const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
               user: `${process.env.EMAIL_ADDRESS}`,
               pass: `${process.env.EMAIL_PASSWORD}`,
            },
         });
         let date = new Date(new Date(user.film_datetime).getTime() - 3 * 60 * 60 * 1000);

         const mailOptions = {
            from: 'Cinemax 🎞 <cinemax@gmail.com>',
            to: `${user.email}`,
            subject: 'Изменение в расписании сеанса',
            text:
               `Произошли изменения в расписании сеанса ${date} фильма ${user.film_title} \n\n`
               + 'Пожалуйста, перейдите в профиль, чтобы ознакомиться с изменениями:\n\n'
               + `http://localhost:3000/profile\n\n`
         };

         transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
               console.error('there was an error: ', err);
            } else {
               console.log({ success: 'Сообщение отправлено' });
            }
         });
      })

      res.json(editShow);

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
                  [Op.substring]: showDate
               }
            }]
         },
         order: [
            ['film_datetime', 'ASC'],
         ],
         include: {
            model: Halls,
            as: 'halls',
         },
         raw: true,
      });
      res.json(allShows);

   } catch (error) {
      console.log(error);
   }
}

