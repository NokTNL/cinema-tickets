import { vi } from "vitest";
import TicketService from "../src/pairtest/TicketService";
import Utils from "../src/pairtest/lib/Utils";

export function injectDependenciesAndMock() {
  // Mock all third-party dependencies
  const seatReservationService = { reserveSeat: vi.fn() };
  const ticketPaymentService = { makePayment: vi.fn() };
  // Spy on internal libraries
  const spyGetNumOfSeatsAndPrice = vi.spyOn(Utils, "getNumOfSeatsAndPrice");

  const ticketService = new TicketService(
    seatReservationService,
    ticketPaymentService,
    Utils.getNumOfSeatsAndPrice
  );

  return {
    seatReservationService,
    ticketPaymentService,
    spyGetNumOfSeatsAndPrice,
    ticketService,
  };
}
