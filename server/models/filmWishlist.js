import { Sequelize } from "sequelize";
import db from "../config/database.js";

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

export default FilmWishlist;