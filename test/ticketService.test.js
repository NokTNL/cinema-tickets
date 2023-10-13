import { describe, expect, test } from "vitest";
import TicketService, {
  InvalidAccountIdException,
} from "../src/pairtest/TicketService";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import { createMocks } from "./testUtils";

describe("TicketService: connectors tests", () => {
  test("TicketService calls getNumOfSeatsAndPrice with the correct args", () => {
    const {
      seatReservationService,
      ticketPaymentService,
      getNumOfSeatsAndPrice,
      spyGetNumOfSeatsAndPrice,
    } = createMocks();

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

    const ACCOUNT_ID = 1440;
    ticketService.purchaseTickets(ACCOUNT_ID, ticketRequests);

    expect(spyGetNumOfSeatsAndPrice).toBeCalledWith(ticketRequests);
  });
  test("If getNumOfSeatsAndPrice returns valid price and seats, seat will be reserved and payment will go through", () => {
    const {
      seatReservationService,
      ticketPaymentService,
      getNumOfSeatsAndPrice,
      spyGetNumOfSeatsAndPrice,
    } = createMocks();

    const ticketService = new TicketService(
      seatReservationService,
      ticketPaymentService,
      getNumOfSeatsAndPrice
    );

    spyGetNumOfSeatsAndPrice.mockImplementationOnce(() => ({
      price: 30,
      numOfSeats: 2,
    }));

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
  test("TicketService throws any exceptions that are thrown by external dependencies", () => {
    const {
      seatReservationService,
      ticketPaymentService,
      getNumOfSeatsAndPrice,
      spyGetNumOfSeatsAndPrice,
    } = createMocks();

    const ticketService = new TicketService(
      seatReservationService,
      ticketPaymentService,
      getNumOfSeatsAndPrice
    );

    const ACCOUNT_ID = 1440;
    const requests = [new TicketTypeRequest("ADULT", 1)];

    // Mock getNumOfSeatsAndPrice throwing an error
    spyGetNumOfSeatsAndPrice.mockImplementationOnce(() => {
      throw Error("mock getNumOfSeatsAndPrice message");
    });
    expect(() => ticketService.purchaseTickets(ACCOUNT_ID, requests)).toThrow(
      Error("mock getNumOfSeatsAndPrice message")
    );

    // Mock seatReservationService throwing an error
    seatReservationService.reserveSeat.mockImplementationOnce(() => {
      throw Error("mock reserveSeat error message");
    });
    expect(() => ticketService.purchaseTickets(ACCOUNT_ID, requests)).toThrow(
      Error("mock reserveSeat error message")
    );

    // Mock ticketPaymentService throwing an error
    ticketPaymentService.makePayment.mockImplementationOnce(() => {
      throw Error("mock makePayment error message");
    });
    expect(() => ticketService.purchaseTickets(ACCOUNT_ID, requests)).toThrow(
      Error("mock makePayment error message")
    );
  });
});
describe("TicketService: integration", () => {
  test("Can buy 1 adult, 1 child & 1 infant ticket with correct price & number of tickets reserved", () => {
    const {
      seatReservationService,
      ticketPaymentService,
      getNumOfSeatsAndPrice,
    } = createMocks();

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
});
describe("TicketService: edge cases ", () => {
  test("accountId must be > 0", () => {
    const {
      seatReservationService,
      ticketPaymentService,
      getNumOfSeatsAndPrice,
    } = createMocks();

    const ticketService = new TicketService(
      seatReservationService,
      ticketPaymentService,
      getNumOfSeatsAndPrice
    );

    const ticketRequests = [new TicketTypeRequest("ADULT", 1)];

    const ACCOUNT_ID = 0;

    expect(() =>
      ticketService.purchaseTickets(ACCOUNT_ID, ticketRequests)
    ).toThrowError(InvalidAccountIdException);
  });
});
