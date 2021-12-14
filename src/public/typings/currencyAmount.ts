/**
 * Currency Amount.
 *
 * @property {string} currency Currency ISO code of the amount.
 * @property {number} amount Amount of the currency in cents. `100` equals $1.00 if currency is `USD`.
 */
export interface CurrencyAmount {
  currency: string
  amount: number
}
