import { vi } from "vitest";
import * as GetNumOfSeatsAndPrice from "../src/pairtest/lib/getNumOfSeatsAndPrice";

export function createMocks() {
  // Mock all third-party dependencies
  const seatReservationService = { reserveSeat: vi.fn() };
  const ticketPaymentService = { makePayment: vi.fn() };
  // Spy on internal libraries
  const spyGetNumOfSeatsAndPrice = vi.spyOn(
    GetNumOfSeatsAndPrice,
    "getNumOfSeatsAndPrice"
  );

  return {
    seatReservationService,
    ticketPaymentService,
    getNumOfSeatsAndPrice: GetNumOfSeatsAndPrice.getNumOfSeatsAndPrice,
    spyGetNumOfSeatsAndPrice,
  };
}
