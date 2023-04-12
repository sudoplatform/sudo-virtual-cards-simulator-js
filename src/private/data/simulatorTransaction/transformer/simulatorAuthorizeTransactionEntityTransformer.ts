/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SimulateAuthorizationResponse } from '../../../../gen/graphqlTypes'
import { SimulatorAuthorizeTransactionEntity } from '../../../domain/entities/simulatorTransaction/simulatorAuthorizeTransactionEntity'

export class SimulatorAuthorizeTransactionEntityTransformer {
  static transform(
    graphQL: SimulateAuthorizationResponse,
  ): SimulatorAuthorizeTransactionEntity {
    return {
      id: graphQL.id,
      approved: graphQL.approved,
      billedAmount: graphQL.billedAmount,
      billed: graphQL.billed,
      declineReason: graphQL.declineReason ?? undefined,
      createdAt: new Date(graphQL.createdAtEpochMs),
      updatedAt: new Date(graphQL.updatedAtEpochMs),
    }
  }
}
