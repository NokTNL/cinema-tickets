import { describe, expect, test, vi } from "vitest";
import TicketService from "../src/pairtest/TicketService";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import getNumOfSeatsAndPrice from "../src/pairtest/lib/getNumOfSeatsAndPrice";

vi.mock("../src/pairtest/lib/getNumOfSeatsAndPrice");

describe("TicketService: unit tests", () => {
  test("TicketService calls getNumOfSeatsAndPrice with the correct args");
  const seatReservationService = {
    reserveSeat: vi.fn(),
  };
  const ticketPaymentService = {
    makePayment: vi.fn(),
  };
  const spyGetNumOfSeatsAndPrice = vi.fn();

  const ticketService = new TicketService(
    seatReservationService,
    ticketPaymentService,
    spyGetNumOfSeatsAndPrice
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
test("Can buy 1 adult, 1 child & 1 infant ticket with correct price & number of tickets", () => {
  const seatReservationService = {
    reserveSeat: vi.fn(),
  };
  const ticketPaymentService = {
    makePayment: vi.fn(),
  };

  const ticketService = new TicketService(
    seatReservationService,
    ticketPaymentService,
    getNumOfSeatsAndPrice
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
