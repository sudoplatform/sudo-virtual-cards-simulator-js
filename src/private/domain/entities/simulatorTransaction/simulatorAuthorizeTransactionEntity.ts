/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CurrencyAmount } from '../../../../public/typings/currencyAmount'

export interface SimulatorAuthorizeTransactionEntity {
  id: string
  approved: boolean
  billed: CurrencyAmount
  billedAmount: CurrencyAmount
  declineReason?: string
  createdAt: Date
  updatedAt: Date
}
