import { Sequelize } from "sequelize";
import db from "../config/database.js";
import FilmsShows from "./filmsShowsModel.js";

const { DataTypes } = Sequelize;

const Halls = db.define('halls', {
   hall_title: {
      type: DataTypes.STRING
   },
   rows_number: {
      type: DataTypes.SMALLINT(5)
   },
   row_seats_number: {
      type: DataTypes.SMALLINT(5)
   }
}, {
   freezeTableName: true,
   timestamps: false
});

Halls.hasMany(FilmsShows, { foreignKey: 'id', as: 'halls' });
FilmsShows.belongsTo(Halls, { foreignKey: 'hall_id', as: 'halls' });

export default Halls;