import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  // TODO: allow optional?
  /**
   * @param {number} accountId
   * @param  {TicketTypeRequest[]} ticketTypeRequests
   */
  purchaseTickets(accountId, ticketTypeRequests) {
    // throws InvalidPurchaseException
  }
}
