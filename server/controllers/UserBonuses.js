import UserBonuses from "../models/userBonusesModel.js";
import db from "../config/database.js";

export const GetUserBonuses = async (req, res) => {
   let { userId } = req.query;

   try {
      let userBonuses = await UserBonuses.findOne({
         attributes: ['current_balance'],
         where: {
            user_Id: userId,
         },
         order: [['version', 'DESC']],
         limit: 1

      });

      res.json(userBonuses);

   } catch (error) {
      console.log(error);
   }
}

export const GetUserBonusHistory = async (req, res) => {
   let { userId } = req.query;

   try {
      let userBonuses = await db.query(
         `SELECT user_bonuses.id, orders.order_number, user_bonuses.date_time, films.film_title, 
         user_bonuses.current_balance, user_bonuses.amount, user_bonuses.operation_type
         FROM user_bonuses
         JOIN orders
         ON orders.order_number = user_bonuses.order_number
         JOIN tickets
         ON tickets.id = orders.ticket_id
         JOIN films_shows
         ON films_shows.id = tickets.film_show_id
         JOIN films
         ON films_shows.film_id = films.id
         WHERE user_bonuses.user_id = '${userId}'
         GROUP BY user_bonuses.id
         ORDER BY user_bonuses.id DESC
         `,
         { type: db.QueryTypes.SELECT }
      );

      res.json(userBonuses);

   } catch (error) {
      console.log(error);
   }
}

export const SetUserBonus = async (req, res) => {
   let { userId, orderNumber, operationType, amount } = req.body;

   try {
      let userBonuses = await UserBonuses.findOne({
         attributes: ['current_balance', 'version'],
         where: {
            user_Id: userId,
         },
         order: [['version', 'DESC']],
         limit: 1

      });

      let version = 1;
      let current_balance = 0;
      if (userBonuses) {
         version = userBonuses.version + 1;
         current_balance = operationType === 1 ? userBonuses.current_balance - amount : userBonuses.current_balance + amount;
      } else {
         current_balance = operationType !== 1 ? amount : 0;
      }

      let value = {
         user_id: userId,
         order_number: orderNumber,
         operation_type: operationType,
         amount: amount,
         current_balance: current_balance,
         version: version,
         date_time: new Date().getTime() + 3 * 60 * 60 * 1000
      };


      let setUserBonuses = await UserBonuses.create(value);

      res.json(setUserBonuses);

   } catch (error) {
      console.log(error);
   }
}

export const ReturnBonus = async (req, res) => {
   let { order_number, userId } = req.query;

   try {

      let currentBonus = await UserBonuses.findOne({
         attributes: ['id', 'operation_type', 'amount'],
         where: {
            order_number: order_number,
         },
      });

      let lastBonus = await UserBonuses.findOne({
         attributes: ['id', 'current_balance', 'order_number', 'operation_type', 'amount'],
         where: {
            user_Id: userId,
         },
         order: [['version', 'DESC']],
         limit: 1
      });

      if (lastBonus.dataValues.order_number == order_number) {
         await UserBonuses.destroy({
            where: {
               order_number: order_number
            }
         });

         let newLastBonus = await UserBonuses.findOne({
            attributes: ['id'],
            where: {
               user_Id: userId,
            },
            order: [['version', 'DESC']],
            limit: 1
         });
         if (newLastBonus) {
            let bonusUpdate = lastBonus.dataValues.amount;
            let curBalance = lastBonus.dataValues.current_balance;
            curBalance = lastBonus.dataValues.operation_type === 1 ? curBalance + bonusUpdate : curBalance - bonusUpdate;

            await UserBonuses.update({ current_balance: curBalance }, {
               where: {
                  id: newLastBonus.dataValues.id
               }
            });
         }

      } else {
         let bonusUpdate = currentBonus.dataValues.amount;
         let curBalance = lastBonus.dataValues.current_balance;
         curBalance = currentBonus.dataValues.operation_type === 1 ? curBalance + bonusUpdate : curBalance - bonusUpdate;

         await UserBonuses.update({ current_balance: curBalance }, {
            where: {
               order_number: lastBonus.dataValues.order_number
            }
         });

         await UserBonuses.destroy({
            where: {
               order_number: order_number
            }
         });
      }

      res.json({
         "message": "Бонусы удалены"
      });

   } catch (error) {
      console.log(error);
   }
}