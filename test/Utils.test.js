import { describe, expect, test } from "vitest";
import TicketTypeRequest, {
  InvalidNumOfTicketsException,
} from "../src/pairtest/lib/TicketTypeRequest";
import Utils, {
  NoAdultsException,
  TooManyTicketsException,
  NoTicketsException,
} from "../src/pairtest/lib/Utils";

describe("Normal scenarios with >= 1 one adult, no infants", () => {
  test("1 adult => 20 pounds, 1 seat", () => {
    const requests = [new TicketTypeRequest("ADULT", 1)];
    expect(Utils.getNumOfSeatsAndPrice(requests)).toEqual({
      price: 20,
      numOfSeats: 1,
    });
  });
  test("2 adults => 40 pounds, 2 seats", () => {
    const requests = [new TicketTypeRequest("ADULT", 2)];
    expect(Utils.getNumOfSeatsAndPrice(requests)).toEqual({
      price: 40,
      numOfSeats: 2,
    });
  });
  test("1 adult, 1 child => 30 pounds, 2 seats", () => {
    const requests = [
      new TicketTypeRequest("CHILD", 1),
      new TicketTypeRequest("ADULT", 1),
    ];
    expect(Utils.getNumOfSeatsAndPrice(requests)).toEqual({
      price: 30,
      numOfSeats: 2,
    });
  });
  test("2 adult, 3 child => 70 pounds, 5 seats", () => {
    const requests = [
      new TicketTypeRequest("CHILD", 3),
      new TicketTypeRequest("ADULT", 2),
    ];
    expect(Utils.getNumOfSeatsAndPrice(requests)).toEqual({
      price: 70,
      numOfSeats: 5,
    });
  });
});
describe("Tickets with infants", () => {
  test("1 adult, 1 infant => 20 pounds, 1 seat", () => {
    const requests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("INFANT", 1),
    ];
    expect(Utils.getNumOfSeatsAndPrice(requests)).toEqual({
      price: 20,
      numOfSeats: 1,
    });
  });
  test("1 adult, 3 infant => 20 pounds, 1 seat", () => {
    const requests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("INFANT", 3),
    ];
    expect(Utils.getNumOfSeatsAndPrice(requests)).toEqual({
      price: 20,
      numOfSeats: 1,
    });
  });
  test("1 adult, 1 infant, 1 child => 30 pounds, 2 seats", () => {
    const requests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("INFANT", 1),
      new TicketTypeRequest("CHILD", 1),
    ];
    expect(Utils.getNumOfSeatsAndPrice(requests)).toEqual({
      price: 30,
      numOfSeats: 2,
    });
  });
});
describe("Children & Infants not allowed to buy their own tickets without adults", () => {
  test("1 child => throws NoAdultsException", () => {
    const requests = [new TicketTypeRequest("CHILD", 1)];
    expect(() => Utils.getNumOfSeatsAndPrice(requests)).toThrowError(
      NoAdultsException
    );
  });
  test("17 child => throws NoAdultsException", () => {
    const requests = [new TicketTypeRequest("CHILD", 17)];
    expect(() => Utils.getNumOfSeatsAndPrice(requests)).toThrowError(
      NoAdultsException
    );
  });
  test("1 infant => throws NoAdultsException", () => {
    const requests = [new TicketTypeRequest("INFANT", 1)];
    expect(() => Utils.getNumOfSeatsAndPrice(requests)).toThrowError(
      NoAdultsException
    );
  });
  test("11 infants => throws NoAdultsException", () => {
    const requests = [new TicketTypeRequest("INFANT", 11)];
    expect(() => Utils.getNumOfSeatsAndPrice(requests)).toThrowError(
      NoAdultsException
    );
  });
  test("1 infant + 3 child => throws NoAdultsException", () => {
    const requests = [
      new TicketTypeRequest("INFANT", 1),
      new TicketTypeRequest("CHILD", 3),
    ];
    expect(() => Utils.getNumOfSeatsAndPrice(requests)).toThrowError(
      NoAdultsException
    );
  });
});

describe("Max 20 tickets allowed", () => {
  test("21 adults => throws TooManyTicketsException", () => {
    const requests = [new TicketTypeRequest("ADULT", 21)];
    expect(() => Utils.getNumOfSeatsAndPrice(requests)).toThrowError(
      TooManyTicketsException
    );
  });
  test("19 adults, 1 child, 1 infant => throws TooManyTicketsExceptionn", () => {
    const requests = [
      new TicketTypeRequest("ADULT", 19),
      new TicketTypeRequest("CHILD", 1),
      new TicketTypeRequest("INFANT", 1),
    ];
    expect(() => Utils.getNumOfSeatsAndPrice(requests)).toThrow(
      TooManyTicketsException
    );
  });
  test("1 adults, 20 infants => throws TooManyTicketsException", () => {
    const requests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("INFANT", 20),
    ];
    expect(() => Utils.getNumOfSeatsAndPrice(requests)).toThrow(
      TooManyTicketsException
    );
  });
  test("20 adults is fine", () => {
    const requests = [new TicketTypeRequest("ADULT", 20)];
    expect(() => Utils.getNumOfSeatsAndPrice(requests)).not.toThrowError();
  });
  test("1 adult, 19 child is fine", () => {
    const requests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("CHILD", 19),
    ];
    expect(() => Utils.getNumOfSeatsAndPrice(requests)).not.toThrowError();
  });
  test("1 adult, 19 infants is fine", () => {
    const requests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("INFANT", 19),
    ];
    expect(() => Utils.getNumOfSeatsAndPrice(requests)).not.toThrowError();
  });
});
describe("Edge cases", () => {
  test("Empty requests array => throws NoTicketsException", () => {
    const requests = [];
    expect(() => Utils.getNumOfSeatsAndPrice(requests)).toThrow(
      NoTicketsException
    );
  });
  test("Any ticket with amount 0 => throws TypeError", () => {
    expect(() => new TicketTypeRequest("CHILD", 0)).toThrow(TypeError);
  });
  test("Any ticket with amount < 0 => throws TypeError", () => {
    expect(() => new TicketTypeRequest("CHILD", -1)).toThrow(TypeError);
  });
  test("Any ticket with amount that is not an integer => throws TypeError", () => {
    expect(() => new TicketTypeRequest("ADULT", 1.1)).toThrow(TypeError);
  });
});
