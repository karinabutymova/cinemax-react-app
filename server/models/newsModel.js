import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const News = db.define('news', {
   news_title: {
      type: DataTypes.STRING,
   },
   news_body: {
      type: DataTypes.TEXT('long')
   },
   news_template: {
      type: DataTypes.INTEGER(5)
   },
   news_images: {
      type: DataTypes.TEXT('medium')
   },
   created_at: {
      type: DataTypes.DATE(6)
   }
}, {
   freezeTableName: true,
   timestamps: false
});

export default News;