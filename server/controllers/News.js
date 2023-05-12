import News from "../models/newsModel.js";
import { Op } from "sequelize";
import db from "../config/database.js";

export const FindNews = async (req, res) => {
   let { searchText } = req.query;
   if (searchText) {
      const news = await News.findAll({
         attributes: ['id', 'news_title', 'news_images', 'created_at'],
         where: {
            news_title: {
               [Op.substring]: searchText
            }
         }
      })
      res.json(news);
   } else {
      res.status(404).json('Пустой запрос');
   }
}

export const GetLastNews = async (req, res) => {
   try {
      const news = await News.findAll({
         attributes: ['id', 'news_title', 'news_images', 'created_at'],
         order: [
            ['created_at', 'DESC'],
         ],
         limit: 3
      })
      res.json(news);
   } catch (error) {
      console.log(error);
   }

}