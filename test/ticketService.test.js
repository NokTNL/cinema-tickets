import { describe, expect, test, vi } from "vitest";
import TicketService from "../src/pairtest/TicketService";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import Utils from "../src/pairtest/lib/Utils";
import TicketPaymentService from "../src/thirdparty/paymentgateway/TicketPaymentService";
import SeatReservationService from "../src/thirdparty/seatbooking/SeatReservationService";

/**
 * Mock all external dependencies
 */
vi.mock("../src/thirdparty/paymentgateway/TicketPaymentService", () => {
  return {
    default: class {
      makePayment = vi.fn();
    },
  };
});
vi.mock("../src/thirdparty/seatbooking/SeatReservationService", () => {
  return {
    default: class {
      reserveSeat = vi.fn();
    },
  };
});

describe("TicketService: unit tests", () => {
  test("TicketService calls getNumOfSeatsAndPrice with the correct args", () => {
    const seatReservationService = new SeatReservationService();
    const ticketPaymentService = new TicketPaymentService();
    const spyGetNumOfSeatsAndPrice = vi.spyOn(Utils, "getNumOfSeatsAndPrice");

    const ticketService = new TicketService(
      seatReservationService,
      ticketPaymentService,
      Utils.getNumOfSeatsAndPrice
    );

    const ticketRequests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("CHILD", 1),
      new TicketTypeRequest("INFANT", 1),
    ];

    const ACCOUNT_ID = 1440;
    ticketService.purchaseTickets(ACCOUNT_ID, ticketRequests);

    expect(spyGetNumOfSeatsAndPrice).toBeCalledWith(ticketRequests);
  });
  test("If getNumOfSeatsAndPrice returns valid price and seats, seat will be reserved and payment will go through", () => {
    const seatReservationService = new SeatReservationService();
    const ticketPaymentService = new TicketPaymentService();
    const spyGetNumOfSeatsAndPrice = vi
      .spyOn(Utils, "getNumOfSeatsAndPrice")
      .mockImplementation(() => ({ price: 30, numOfSeats: 2 }));

    const ticketService = new TicketService(
      seatReservationService,
      ticketPaymentService,
      Utils.getNumOfSeatsAndPrice
    );

    const ticketRequests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("CHILD", 1),
      new TicketTypeRequest("INFANT", 1),
    ];

    const ACCOUNT_ID = 1440;
    ticketService.purchaseTickets(ACCOUNT_ID, ticketRequests);

    expect(seatReservationService.reserveSeat).toHaveBeenCalledTimes(1);
    expect(seatReservationService.reserveSeat).toHaveBeenCalledWith(1440, 2);
    expect(ticketPaymentService.makePayment).toHaveBeenCalledTimes(1);
    expect(ticketPaymentService.makePayment).toHaveBeenCalledWith(1440, 30);
  });
});

describe("TicketService: integration", () => {
  test("Can buy 1 adult, 1 child & 1 infant ticket with correct price & number of tickets", () => {
    const seatReservationService = new SeatReservationService();
    const ticketPaymentService = new TicketPaymentService();
    const spyGetNumOfSeatsAndPrice = vi.spyOn(Utils, "getNumOfSeatsAndPrice");

    const ticketService = new TicketService(
      seatReservationService,
      ticketPaymentService,
      Utils.getNumOfSeatsAndPrice
    );

    const ticketRequests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("CHILD", 1),
      new TicketTypeRequest("INFANT", 1),
    ];

    const ACCOUNT_ID = 13579;
    ticketService.purchaseTickets(ACCOUNT_ID, ticketRequests);

    expect(seatReservationService.reserveSeat).toHaveBeenCalledTimes(1);
    expect(seatReservationService.reserveSeat).toHaveBeenCalledWith(13579, 2);
    expect(ticketPaymentService.makePayment).toHaveBeenCalledTimes(1);
    expect(ticketPaymentService.makePayment).toHaveBeenCalledWith(13579, 30);
  });
});
