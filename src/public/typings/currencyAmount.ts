/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
