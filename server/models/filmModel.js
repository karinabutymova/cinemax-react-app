import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Film = db.define('films', {
   film_title: {
      type: DataTypes.STRING
   },
   photo_path: {
      type: DataTypes.STRING
   },
   description: {
      type: DataTypes.TEXT
   },
   film_runtime: {
      type: DataTypes.SMALLINT(5)
   },
   creators: {
      type: DataTypes.TEXT
   },
   actors: {
      type: DataTypes.TEXT
   },
   year: {
      type: DataTypes.INTEGER(5)
   },
   genres: {
      type: DataTypes.STRING
   },
   country: {
      type: DataTypes.STRING
   },
   from_rent_date: {
      type: DataTypes.DATE
   },
   to_rent_date: {
      type: DataTypes.DATE
   },
   age_limit: {
      type: DataTypes.SMALLINT(5)
   },
   trailer_link: {
      type: DataTypes.TEXT('medium')
   }
}, {
   freezeTableName: true,
   timestamps: false
});

export default Film;