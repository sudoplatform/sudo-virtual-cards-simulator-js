/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SimulateDebitResponse } from '../../../../gen/graphqlTypes'
import { SimulatorDebitTransactionEntity } from '../../../domain/entities/simulatorTransaction/simulatorDebitTransactionEntity'

export class SimulatorDebitTransactionEntityTransformer {
  static transform(
    graphQl: SimulateDebitResponse,
  ): SimulatorDebitTransactionEntity {
    return {
      id: graphQl.id,
      billedAmount: graphQl.billedAmount,
      createdAt: new Date(graphQl.createdAtEpochMs),
      updatedAt: new Date(graphQl.updatedAtEpochMs),
    }
  }
}
