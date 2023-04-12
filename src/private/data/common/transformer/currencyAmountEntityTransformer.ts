/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CurrencyAmount } from '../../../../gen/graphqlTypes'
import { CurrencyAmountEntity } from '../../../domain/entities/common/currenyAmountEntity'

export class CurrencyAmountEntityTransformer {
  static transform(data: CurrencyAmount): CurrencyAmountEntity {
    return {
      currency: data.currency,
      amount: data.amount,
    }
  }
}
