import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import getNumOfSeatsAndPrice from "./lib/getNumOfSeatsAndPrice.js";

export default class TicketService {
  /**
   * @readonly
   */
  #seatReservationService;
  /**
   * @readonly
   */
  #ticketPaymentService;
  /**
   * @readonly
   */
  #getNumOfSeatsAndPrice;
  /**
   * @param {SeatReservationService} seatReservationService
   * @param {TicketPaymentService} ticketPaymentService
   * @param {getNumOfSeatsAndPrice} getNumOfSeatsAndPrice
   */
  constructor(
    seatReservationService,
    ticketPaymentService,
    getNumOfSeatsAndPrice
  ) {
    this.#ticketPaymentService = ticketPaymentService;
    this.#seatReservationService = seatReservationService;
    this.#getNumOfSeatsAndPrice = getNumOfSeatsAndPrice;
  }
  /**
   * @param {number} accountId
   * @param  {TicketTypeRequest[]} ticketTypeRequests
   */
  // TODO: check accountId is valid
  purchaseTickets(accountId, ticketTypeRequests) {
    this.#getNumOfSeatsAndPrice(ticketTypeRequests);
    // throw new InvalidPurchaseException();
  }
}
