import Seats from "../models/seatsModel.js";

export const SetNewSeats = async (req, res) => {
   let { hallId, selectedSeats } = req.query;

   try {
      let values = selectedSeats.map((selected) => {
         return {
            hall_id: parseInt(hallId),
            row_number: parseInt(selected.row),
            seat_number: parseInt(selected.seat)
         }
      });

      const seatsId = await Seats.bulkCreate(values);

      res.json(seatsId);

   } catch (error) {
      console.log(error);
   }
}