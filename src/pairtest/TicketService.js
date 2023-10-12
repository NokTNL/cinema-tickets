import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import Utils from "./lib/Utils.js";

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
   * @param {Utils.getNumOfSeatsAndPrice} getNumOfSeatsAndPrice
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
  // TODO: Check if array is longer than zero
  // TODO: test handle exceptions?
  purchaseTickets(accountId, ticketTypeRequests) {
    const { price, numOfSeats } =
      this.#getNumOfSeatsAndPrice(ticketTypeRequests);
    this.#seatReservationService.reserveSeat(accountId, numOfSeats);
    this.#ticketPaymentService.makePayment(accountId, price);
    // throw new InvalidPurchaseException();
  }
}
