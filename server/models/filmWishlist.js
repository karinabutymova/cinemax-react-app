import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Film from "./filmModel.js";

const { DataTypes } = Sequelize;

const FilmWishlist = db.define('film_wishlist', {
   user_id: {
      type: DataTypes.INTEGER(10)
   },
   film_id: {
      type: DataTypes.INTEGER(10)
   }
}, {
   freezeTableName: true,
   timestamps: false
});

Film.hasMany(FilmWishlist, { foreignKey: 'id', as: 'wishlist' });
FilmWishlist.belongsTo(Film, { foreignKey: 'film_id', as: 'wishlist' });

export default FilmWishlist;