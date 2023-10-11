import { test, expect, describe } from "vitest";
import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest";
import getNumOfTixAndPrice from "../../src/pairtest/lib/getNumOfTixAndPrice";

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
