/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SimulatorReversalTransactionEntity } from '../../domain/entities/simulatorTransaction/simulateReversalTransactionEntity'
import { SimulatorAuthorizationExpiryTransactionEntity } from '../../domain/entities/simulatorTransaction/simulatorAuthorizationExpiryTransactionEntity'
import { SimulatorAuthorizeTransactionEntity } from '../../domain/entities/simulatorTransaction/simulatorAuthorizeTransactionEntity'
import { SimulatorDebitTransactionEntity } from '../../domain/entities/simulatorTransaction/simulatorDebitTransactionEntity'
import { SimulatorRefundTransactionEntity } from '../../domain/entities/simulatorTransaction/simulatorRefundTransactionEntity'
import {
  SimulatorTransactionService,
  SimulatorTransactionServiceAuthorizeInput,
  SimulatorTransactionServiceDebitInput,
  SimulatorTransactionServiceExpireAuthorizationInput,
  SimulatorTransactionServiceIncrementalAuthorizeInput,
  SimulatorTransactionServiceRefundInput,
  SimulatorTransactionServiceReverseInput,
} from '../../domain/entities/simulatorTransaction/simulatorTransactionService'
import { ApiClient } from '../common/apiClient'
import { SimulatorAuthorizationExpiryTransactionEntityTransformer } from './transformer/simulatorAuthorizationExpiryTransactionEntityTransformer'
import { SimulatorAuthorizeTransactionEntityTransformer } from './transformer/simulatorAuthorizeTransactionEntityTransformer'
import { SimulatorDebitTransactionEntityTransformer } from './transformer/simulatorDebitTransactionEntityTransformer'
import { SimulatorRefundTransactionEntityTransformer } from './transformer/simulatorRefundTransactionEntityTransformer'
import { SimulatorReversalTransactionEntityTransformer } from './transformer/simulatorReversalTransactionEntityTransformer'

export class DefaultSimulatorTransactionService
  implements SimulatorTransactionService
{
  constructor(private readonly apiClient: ApiClient) {}

  async authorize(
    input: SimulatorTransactionServiceAuthorizeInput,
  ): Promise<SimulatorAuthorizeTransactionEntity> {
    const result = await this.apiClient.simulateAuthorization(input)
    return SimulatorAuthorizeTransactionEntityTransformer.transform(result)
  }
  async incrementalAuthorize(
    input: SimulatorTransactionServiceIncrementalAuthorizeInput,
  ): Promise<SimulatorAuthorizeTransactionEntity> {
    const result = await this.apiClient.simulateIncrementalAuthorization(input)
    return SimulatorAuthorizeTransactionEntityTransformer.transform(result)
  }
  async reverse(
    input: SimulatorTransactionServiceReverseInput,
  ): Promise<SimulatorReversalTransactionEntity> {
    const result = await this.apiClient.simulateReversal(input)
    return SimulatorReversalTransactionEntityTransformer.transform(result)
  }
  async expireAuthorization(
    input: SimulatorTransactionServiceExpireAuthorizationInput,
  ): Promise<SimulatorAuthorizationExpiryTransactionEntity> {
    const result = await this.apiClient.simulateAuthorizationExpiry(input)
    return SimulatorAuthorizationExpiryTransactionEntityTransformer.transform(
      result,
    )
  }
  async refund(
    input: SimulatorTransactionServiceRefundInput,
  ): Promise<SimulatorRefundTransactionEntity> {
    const result = await this.apiClient.simulateRefund(input)
    return SimulatorRefundTransactionEntityTransformer.transform(result)
  }

  async debit(
    input: SimulatorTransactionServiceDebitInput,
  ): Promise<SimulatorDebitTransactionEntity> {
    const result = await this.apiClient.simulateDebit(input)
    return SimulatorDebitTransactionEntityTransformer.transform(result)
  }
}
