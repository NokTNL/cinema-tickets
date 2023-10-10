export default class TicketPurchaseResult {
  /**
   * @readonly
   * @type {'SUCESS'}
   */
  status;

  /**
   * @readonly
   * @type {string}
   */
  referenceId;

  /**
   *
   * @param {'SUCESS'} status
   * @param {string} referenceId
   */
  constructor(status, referenceId) {}
}
