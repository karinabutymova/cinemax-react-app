import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const UserBonuses = db.define('user_bonuses', {
   user_id: {
      type: DataTypes.INTEGER(10)
   },
   order_number: {
      type: DataTypes.INTEGER(10)
   },
   operation_type: {
      type: DataTypes.INTEGER(5)
   },
   amount: {
      type: DataTypes.FLOAT
   },
   current_balance: {
      type: DataTypes.FLOAT
   },
   version: {
      type: DataTypes.INTEGER(10)
   }
}, {
   freezeTableName: true,
   timestamps: false
});

export default UserBonuses;