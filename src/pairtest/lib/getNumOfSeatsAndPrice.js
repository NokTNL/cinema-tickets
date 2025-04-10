import TicketTypeRequest from "./TicketTypeRequest";

const ticketPriceByType = {
  ADULT: 20,
  CHILD: 10,
  INFANT: 0,
};

export class TooManyTicketsException extends Error {}
export class NoAdultsException extends Error {}
export class NoTicketsException extends Error {}

/**
 * @param {TicketTypeRequest[]} requests
 * @returns
 */
export function getNumOfSeatsAndPrice(requests) {
  if (requests.length === 0) {
    throw new NoTicketsException();
  }

  const hasAdults = requests.some((req) => req.getTicketType() === "ADULT");

  if (!hasAdults) {
    throw new NoAdultsException();
  }

  const numOfTickets = requests.reduce(
    (sum, req) => sum + req.getNoOfTickets(),
    0
  );
  if (numOfTickets > 20) {
    throw new TooManyTicketsException();
  }

  const numOfSeats = requests
    .filter((req) => req.getTicketType() !== "INFANT")
    .reduce((sum, req) => sum + req.getNoOfTickets(), 0);

  const price = requests.reduce(
    (sum, req) =>
      sum + ticketPriceByType[req.getTicketType()] * req.getNoOfTickets(),
    0
  );

  return {
    price,
    numOfSeats,
  };
}
