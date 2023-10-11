import { describe, expect, test } from "vitest";
import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest";
import getNumOfTixAndPrice, {
  TooManyTicketsException,
} from "../../src/pairtest/lib/getNumOfTixAndPrice";

describe("Normal scenarios with >= 1 one adult", () => {
  test("1 adult => 20 pounds, 1 ticket", () => {
    const requests = [new TicketTypeRequest("ADULT", 1)];
    expect(getNumOfTixAndPrice(requests)).toEqual({
      price: 20,
      numOfTix: 1,
    });
  });
  test("2 adults => 40 pounds, 2 tickets", () => {
    const requests = [new TicketTypeRequest("ADULT", 2)];
    expect(getNumOfTixAndPrice(requests)).toEqual({
      price: 40,
      numOfTix: 2,
    });
  });
  test("1 adult, 1 child => 30 pounds, 2 tickets", () => {
    const requests = [
      new TicketTypeRequest("CHILD", 1),
      new TicketTypeRequest("ADULT", 1),
    ];
    expect(getNumOfTixAndPrice(requests)).toEqual({
      price: 30,
      numOfTix: 2,
    });
  });
  test("2 adult, 3 child => 70 pounds, 5 tickets", () => {
    const requests = [
      new TicketTypeRequest("CHILD", 3),
      new TicketTypeRequest("ADULT", 2),
    ];
    expect(getNumOfTixAndPrice(requests)).toEqual({
      price: 70,
      numOfTix: 5,
    });
  });
  test("2 adult, 3 child => 70 pounds, 5 tickets", () => {
    const requests = [
      new TicketTypeRequest("CHILD", 3),
      new TicketTypeRequest("ADULT", 2),
    ];
    expect(getNumOfTixAndPrice(requests)).toEqual({
      price: 70,
      numOfTix: 5,
    });
  });
});
describe("Max 20 tickets allowed", () => {
  // TODO: test Infants
  test("21 adults => throws TooManyTicketsException", () => {
    const requests = [new TicketTypeRequest("ADULT", 21)];
    expect(() => getNumOfTixAndPrice(requests)).toThrowError(
      TooManyTicketsException
    );
  });
  test("20 adults, 1 child => throws TooManyTicketsExceptionn", () => {
    const requests = [
      new TicketTypeRequest("ADULT", 20),
      new TicketTypeRequest("CHILD", 1),
    ];
    expect(() => getNumOfTixAndPrice(requests)).toThrow(
      TooManyTicketsException
    );
  });
  test("1 adults, 20 child => throws TooManyTicketsException", () => {
    const requests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("CHILD", 20),
    ];
    expect(() => getNumOfTixAndPrice(requests)).toThrow(
      TooManyTicketsException
    );
  });
  test("20 adults is fine", () => {
    const requests = [new TicketTypeRequest("ADULT", 20)];
    expect(() => getNumOfTixAndPrice(requests)).not.toThrowError();
  });
  test("1 adult, 19 child is fine", () => {
    const requests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("ADULT", 19),
    ];
    expect(() => getNumOfTixAndPrice(requests)).not.toThrowError();
  });
});
