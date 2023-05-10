import Halls from "../models/hallsModel.js";

export const GetAllHallsTitles = async (req, res) => {
   try {
      const halls = await Halls.findAll({
         attributes: ['id', 'hall_title']
      });
      res.json(halls);
   } catch (error) {
      console.log(error);
   }
}