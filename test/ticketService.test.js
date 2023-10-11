import { expect, test, vi } from "vitest";
import TicketService from "../src/pairtest/TicketService";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import SeatReservationService from "../src/thirdparty/seatbooking/SeatReservationService";
import TicketPaymentService from "../src/thirdparty/paymentgateway/TicketPaymentService";

test("Can buy 1 adult ticket with correct price & number of tickets", () => {
  // TODO: mention why using spy instead of mocks
  const seatReservationService = new SeatReservationService();
  const spyReserveSeat = vi.spyOn(seatReservationService, "reserveSeat");

  const ticketPaymentService = new TicketPaymentService();
  const spyMakePayment = vi.spyOn(ticketPaymentService, "makePayment");

  const ticketService = new TicketService(
    seatReservationService,
    ticketPaymentService
  );

  const ticketRequests = [new TicketTypeRequest("ADULT", 1)];

  ticketService.purchaseTickets(13579, ticketRequests);

  expect(spyReserveSeat).toHaveBeenCalledTimes(1);
  expect(spyReserveSeat).toHaveBeenCalledWith(13579, 1);
  expect(spyMakePayment).toHaveBeenCalledTimes(1);
  expect(spyMakePayment).toHaveBeenCalledWith(13579, 20);
});
test("Can buy 1 child ticket with correct price & number of tickets", () => {
  const seatReservationService = new SeatReservationService();
  const spyReserveSeat = vi.spyOn(seatReservationService, "reserveSeat");

  const ticketPaymentService = new TicketPaymentService();
  const spyMakePayment = vi.spyOn(ticketPaymentService, "makePayment");

  const ticketService = new TicketService(
    seatReservationService,
    ticketPaymentService
  );
  const ticketRequests = [new TicketTypeRequest("CHILD", 1)];

  ticketService.purchaseTickets(1440, ticketRequests);

  expect(spyReserveSeat).toHaveBeenCalledTimes(1);
  expect(spyReserveSeat).toHaveBeenCalledWith(1440, 1);
  expect(spyMakePayment).toHaveBeenCalledTimes(1);
  expect(spyMakePayment).toHaveBeenCalledWith(1440, 10);
});
