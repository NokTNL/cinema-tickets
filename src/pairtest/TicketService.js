import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import { getNumOfSeatsAndPrice } from "./lib/getNumOfSeatsAndPrice.js";

export class InvalidAccountIdException extends Error {
  message = "Account Id must be > 0";
}

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
  purchaseTickets(accountId, ticketTypeRequests) {
    if (accountId <= 0) {
      throw new InvalidAccountIdException();
    }
    const { price, numOfSeats } =
      this.#getNumOfSeatsAndPrice(ticketTypeRequests);
    this.#seatReservationService.reserveSeat(accountId, numOfSeats);
    this.#ticketPaymentService.makePayment(accountId, price);
  }
}
