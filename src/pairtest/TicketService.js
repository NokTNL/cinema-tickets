import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";
import TicketTypeRequest from "./lib/TicketTypeRequest.js";

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
   * @param {SeatReservationService} seatReservationService
   * @param {TicketPaymentService} ticketPaymentService
   */
  constructor(seatReservationService, ticketPaymentService) {
    this.#ticketPaymentService = ticketPaymentService;
    this.#seatReservationService = seatReservationService;
  }
  /**
   * @param {number} accountId
   * @param  {TicketTypeRequest[]} ticketTypeRequests
   */
  // TODO: check accountId is valid
  purchaseTickets(accountId, ticketTypeRequests) {
    this.#seatReservationService.reserveSeat(
      accountId,
      ticketTypeRequests[0].getNoOfTickets()
    );
    switch (ticketTypeRequests[0].getTicketType()) {
      case "ADULT": {
        this.#ticketPaymentService.makePayment(accountId, 20);
        return;
      }
      case "CHILD": {
        this.#ticketPaymentService.makePayment(accountId, 10);
        return;
      }
    }
  }
}
