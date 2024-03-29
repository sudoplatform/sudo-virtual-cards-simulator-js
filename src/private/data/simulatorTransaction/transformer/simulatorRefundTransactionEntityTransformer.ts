/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SimulateRefundResponse } from '../../../../gen/graphqlTypes'
import { SimulatorRefundTransactionEntity } from '../../../domain/entities/simulatorTransaction/simulatorRefundTransactionEntity'

export class SimulatorRefundTransactionEntityTransformer {
  static transform(
    graphQl: SimulateRefundResponse,
  ): SimulatorRefundTransactionEntity {
    return {
      id: graphQl.id,
      billedAmount: graphQl.billedAmount,
      createdAt: new Date(graphQl.createdAtEpochMs),
      updatedAt: new Date(graphQl.updatedAtEpochMs),
    }
  }
}
