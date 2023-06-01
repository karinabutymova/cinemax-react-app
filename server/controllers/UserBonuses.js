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
         version: version
      };


      let setUserBonuses = await UserBonuses.create(value);

      res.json(setUserBonuses);

   } catch (error) {
      console.log(error);
   }
}

export const ReturnBonus = async (req, res) => {
   let { order_number } = req.query;

   try {
      await UserBonuses.destroy({
         where: {
            order_number: order_number
         }
      });
      res.json({
         "message": "Бонусы удалены"
      });

   } catch (error) {
      console.log(error);
   }
}