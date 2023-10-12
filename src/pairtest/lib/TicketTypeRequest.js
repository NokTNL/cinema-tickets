/**
 * @typedef {"ADULT" | "CHILD" | "INFANT"} TicketType
 */

export class InvalidNumOfTicketsException extends Error {}

/**
 * Immutable Object.
 */
export default class TicketTypeRequest {
  /**
   * @readonly
   */
  #type;

  /**
   * @readonly
   */
  #noOfTickets;

  /**
   * @param {TicketType} type
   * @param {number} noOfTickets
   */
  constructor(type, noOfTickets) {
    if (!this.#Type.includes(type)) {
      throw new TypeError(
        `type must be ${this.#Type
          .slice(0, -1)
          .join(", ")}, or ${this.#Type.slice(-1)}`
      );
    }

    if (!Number.isInteger(noOfTickets)) {
      throw new TypeError("noOfTickets must be an integer");
    }

    if (noOfTickets <= 0) {
      throw new TypeError("noOfTickets must be > 0");
    }

    this.#type = type;
    this.#noOfTickets = noOfTickets;
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }

  /**
   * @readonly
   * @type {TicketType[]}
   */
  #Type = ["ADULT", "CHILD", "INFANT"];
}
