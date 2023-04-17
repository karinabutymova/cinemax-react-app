import Order from "../models/orderModel.js";

export const SetOrder = async (req, res) => {
   let { tickets } = req.body;
   try {
      let orderNumber = await Order.max('order_number');

      orderNumber = orderNumber ? orderNumber + 1 : 1;

      let ticketsId = tickets.map((ticket) => {
         return {
            ticket_id: ticket.id,
            order_number: orderNumber,
         }

      });

      const order = await Order.bulkCreate(ticketsId);

      res.json(orderNumber);

   } catch (error) {
      console.log(error);
   }
}