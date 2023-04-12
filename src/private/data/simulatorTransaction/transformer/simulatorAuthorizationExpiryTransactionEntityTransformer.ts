/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SimulateAuthorizationExpiryResponse } from '../../../../gen/graphqlTypes'
import { SimulatorAuthorizationExpiryTransactionEntity } from '../../../domain/entities/simulatorTransaction/simulatorAuthorizationExpiryTransactionEntity'

export class SimulatorAuthorizationExpiryTransactionEntityTransformer {
  static transform(
    graphQl: SimulateAuthorizationExpiryResponse,
  ): SimulatorAuthorizationExpiryTransactionEntity {
    return {
      id: graphQl.id,
      createdAt: new Date(graphQl.createdAtEpochMs),
      updatedAt: new Date(graphQl.updatedAtEpochMs),
    }
  }
}
