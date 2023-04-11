import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./userModel.js";
import Film from "./filmModel.js";

const { DataTypes } = Sequelize;

const FilmReviews = db.define('films_reviews', {
   user_id: {
      type: DataTypes.INTEGER(10),
   },
   film_id: {
      type: DataTypes.INTEGER(10)
   },
   review_text: {
      type: DataTypes.TEXT('long')
   },
   created_at: {
      type: DataTypes.DATE(6)
   }
}, {
   freezeTableName: true,
   timestamps: false
});

User.hasMany(FilmReviews, { foreignKey: 'id', as: 'reviews_user' });
FilmReviews.belongsTo(User, { foreignKey: 'user_id', as: 'reviews_user' });

Film.hasMany(FilmReviews, { foreignKey: 'id', as: 'reviews_film' });
FilmReviews.belongsTo(Film, { foreignKey: 'film_id', as: 'reviews_film' });

export default FilmReviews;