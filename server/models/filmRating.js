import { Sequelize } from "sequelize";
import Film from "./filmModel.js";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const FilmRating = db.define('films_rating', {
   film_id: {
      type: DataTypes.INTEGER(10)
   },
   user_id: {
      type: DataTypes.INTEGER(10),
   },
   rating: {
      type: DataTypes.SMALLINT(5)
   }
}, {
   freezeTableName: true,
   timestamps: false
});

Film.hasMany(FilmRating, { foreignKey: 'film_id', as: 'films_rating' });
FilmRating.belongsTo(Film, { foreignKey: 'id' });

export default FilmRating;