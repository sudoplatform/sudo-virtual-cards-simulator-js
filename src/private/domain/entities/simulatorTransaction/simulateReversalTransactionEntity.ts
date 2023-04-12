/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CurrencyAmountEntity } from '../common/currenyAmountEntity'

export interface SimulatorReversalTransactionEntity {
  id: string
  billedAmount: CurrencyAmountEntity
  createdAt: Date
  updatedAt: Date
}
