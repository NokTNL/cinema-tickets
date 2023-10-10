import { test, expect } from "vitest";
import TicketService from "../src/pairtest/TicketService";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import TicketPurchaseResult from "../src/pairtest/lib/TicketPurchaseResult";

test("Can buy 1 adult ticket", () => {
  // 2 * adult, 1 * children .....
  // amount --> pay
  // seats needed --> reserve
  // Done

  const ticketRequests = [new TicketTypeRequest("ADULT", 1)];

  const ticketService = new TicketService();
  const result = ticketService.purchaseTickets(1, ticketRequests);
  expect(result).toEqual(
    new TicketPurchaseResult("SUCESS", expect.any(String))
  );
});
