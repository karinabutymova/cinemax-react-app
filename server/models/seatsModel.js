import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Seats = db.define('seats', {
   hall_id: {
      type: DataTypes.INTEGER(10)
   },
   row_number: {
      type: DataTypes.SMALLINT(5)
   },
   seat_number: {
      type: DataTypes.SMALLINT(5)
   }
}, {
   freezeTableName: true,
   timestamps: false
});

export default Seats;