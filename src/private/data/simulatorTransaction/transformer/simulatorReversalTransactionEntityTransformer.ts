/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SimulateReversalResponse } from '../../../../gen/graphqlTypes'
import { SimulatorReversalTransactionEntity } from '../../../domain/entities/simulatorTransaction/simulateReversalTransactionEntity'

export class SimulatorReversalTransactionEntityTransformer {
  static transform(
    graphQl: SimulateReversalResponse,
  ): SimulatorReversalTransactionEntity {
    return {
      id: graphQl.id,
      billedAmount: graphQl.billedAmount,
      createdAt: new Date(graphQl.createdAtEpochMs),
      updatedAt: new Date(graphQl.updatedAtEpochMs),
    }
  }
}
