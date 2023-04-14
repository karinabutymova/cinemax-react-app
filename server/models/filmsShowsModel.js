import { Sequelize } from "sequelize";
import Film from "./filmModel.js";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const FilmsShows = db.define('films_shows', {
   hall_id: {
      type: DataTypes.INTEGER(10)
   },
   film_datetime: {
      type: DataTypes.DATE,
   },
   film_id: {
      type: DataTypes.INTEGER(10),
   },
   price: {
      type: DataTypes.FLOAT
   }
}, {
   freezeTableName: true,
   timestamps: false
});

Film.hasMany(FilmsShows, { foreignKey: 'film_id', as: 'films_shows' });
FilmsShows.belongsTo(Film, { foreignKey: 'id', as: 'films' });

export default FilmsShows;