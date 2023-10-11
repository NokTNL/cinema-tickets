import { expect, test, vi } from "vitest";
import TicketService from "../src/pairtest/TicketService";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";

// TODO: re-enable it
test.skip("Can buy 1 adult ticket with correct price & number of tickets", () => {
  const seatReservationService = {
    reserveSeat: vi.fn(),
  };
  const ticketPaymentService = {
    makePayment: vi.fn(),
  };

  const ticketService = new TicketService(
    seatReservationService,
    ticketPaymentService
  );

  const ticketRequests = [new TicketTypeRequest("ADULT", 1)];

  ticketService.purchaseTickets(13579, ticketRequests);

  expect(seatReservationService.reserveSeat).toHaveBeenCalledTimes(1);
  expect(seatReservationService.reserveSeat).toHaveBeenCalledWith(13579, 1);
  expect(ticketPaymentService.makePayment).toHaveBeenCalledTimes(1);
  expect(ticketPaymentService.makePayment).toHaveBeenCalledWith(13579, 20);
});
