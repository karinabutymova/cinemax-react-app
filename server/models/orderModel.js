import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Order = db.define('orders', {
   ticket_id: {
      type: DataTypes.INTEGER(10)
   },
   order_number: {
      type: DataTypes.INTEGER(10)
   }
}, {
   freezeTableName: true,
   timestamps: false
});

export default Order;