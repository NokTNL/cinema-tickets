## Installation

```
npm install
```

## Running the tests

```
npm run test
```

## Approach to the problem

The problem was appraoched with an inside-out, then outside-in TDD approach:

- First writing unit tests for the core `getNumOfSeatsAndPrice` function for handling the logic of calculating all the prices and number of seats
- Then, an integration test for `TicketService` was written to guide me writing all the unit tests for connecting `getNumOfSeatsAndPrice` with the third-party libraries
- Unit tests were also written for edge cases, e.g. invalid purchases, invalid param values & type errors
