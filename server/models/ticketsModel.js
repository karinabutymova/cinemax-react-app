import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Seats from "./seatsModel.js";

const { DataTypes } = Sequelize;

const Tickets = db.define('tickets', {
   user_id: {
      type: DataTypes.INTEGER(10)
   },
   seat_id: {
      type: DataTypes.INTEGER(10)
   },
   film_show_id: {
      type: DataTypes.INTEGER(10)
   }
}, {
   freezeTableName: true,
   timestamps: false
});

Tickets.hasMany(Seats, { foreignKey: 'seat_id', as: 'seats_ticket' });
Seats.belongsTo(Tickets, { foreignKey: 'id', as: 'seats' });

export default Tickets;