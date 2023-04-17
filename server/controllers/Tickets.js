import Tickets from "../models/ticketsModel.js";
import db from "../config/database.js";
import Seats from "../models/seatsModel.js";

export const GetUnavailableSeats = async (req, res) => {
   let { showHall } = req.query;

   try {
      const [unavailableSeats] = await db.query(
         `SELECT * FROM tickets AS tickets
            INNER JOIN seats AS seats 
            ON tickets.seat_id = seats.id
            WHERE tickets.film_show_id = ${showHall}`
      );
      res.json(unavailableSeats);

   } catch (error) {
      console.log(error);
   }
}

export const SetNewTickets = async (req, res) => {
   let { userId, filmShowId, seats } = req.query;
   try {
      let values = seats.map((selected) => {
         return {
            user_id: userId,
            seat_id: selected.id,
            film_show_id: filmShowId
         }
      });

      const ticketsId = await Tickets.bulkCreate(values);

      res.json(ticketsId);

   } catch (error) {
      console.log(error);
   }
}

export const GetUserTicketsCount = async (req, res) => {
   let { userId } = req.query;
   try {
      const [tickets] = await db.query(
         `SELECT orders.id, orders.order_number, user_bonuses.operation_type, user_bonuses.amount, films.id as film_id, 
         films_shows.film_datetime, films_shows.price, films.film_title, COUNT(orders.ticket_id) as tickets_count
         FROM user_bonuses
         INNER JOIN orders
         ON orders.order_number = user_bonuses.order_number
         INNER JOIN tickets
         ON tickets.id = orders.ticket_id
         INNER JOIN films_shows 
         ON tickets.film_show_id = films_shows.id
         INNER JOIN films
         ON films_shows.film_id = films.id
         WHERE user_bonuses.user_id = ${userId}
         GROUP BY user_bonuses.order_number
         ORDER BY orders.id DESC
         `
      );

      res.json(tickets);

   } catch (error) {
      console.log(error);
   }
}

export const GetUserShowTickets = async (req, res) => {
   let { orderNumber } = req.query;
   try {
      const [tickets] = await db.query(
         `SELECT orders.id as id, films.id as film_id, films.film_title, films.photo_path,
         films_shows.film_datetime, films_shows.price, halls.hall_title,
         seats.row_number, seats.seat_number
         FROM orders
         INNER JOIN tickets
         ON tickets.id = orders.ticket_id
         INNER JOIN films_shows 
         ON tickets.film_show_id = films_shows.id
         INNER JOIN films
         ON films_shows.film_id = films.id
         INNER JOIN seats
         ON seats.id = tickets.seat_id
         INNER JOIN halls
         ON halls.id = films_shows.hall_id
         WHERE orders.order_number = ${orderNumber}
         `
      );

      res.json(tickets);

   } catch (error) {
      console.log(error);
   }
}
