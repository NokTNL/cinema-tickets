import { vi } from "vitest";
import TicketService from "../src/pairtest/TicketService";
import * as GetNumOfSeatsAndPrice from "../src/pairtest/lib/getNumOfSeatsAndPrice";

export function injectDependenciesAndMock() {
  // Mock all third-party dependencies
  const seatReservationService = { reserveSeat: vi.fn() };
  const ticketPaymentService = { makePayment: vi.fn() };
  // Spy on internal libraries
  const spyGetNumOfSeatsAndPrice = vi.spyOn(
    GetNumOfSeatsAndPrice,
    "getNumOfSeatsAndPrice"
  );

  const ticketService = new TicketService(
    seatReservationService,
    ticketPaymentService,
    GetNumOfSeatsAndPrice.getNumOfSeatsAndPrice
  );

  return {
    seatReservationService,
    ticketPaymentService,
    spyGetNumOfSeatsAndPrice,
    ticketService,
  };
}
