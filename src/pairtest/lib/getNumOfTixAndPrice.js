import TicketTypeRequest from "./TicketTypeRequest";

const ticketPriceByType = {
  ADULT: 20,
  CHILD: 10,
};

/**
 * @param {TicketTypeRequest[]} requests
 * @returns {{price: number; numOfTix: number}}
 */
export default function getNumOfTixAndPrice(requests) {
  const numOfTix = requests.reduce((sum, req) => sum + req.getNoOfTickets(), 0);
  const price = requests.reduce(
    (sum, req) =>
      sum + ticketPriceByType[req.getTicketType()] * req.getNoOfTickets(),
    0
  );

  return {
    price,
    numOfTix,
  };
}
