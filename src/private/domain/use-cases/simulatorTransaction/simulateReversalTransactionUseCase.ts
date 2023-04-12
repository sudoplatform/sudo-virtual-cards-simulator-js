/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CurrencyAmount } from '../../../..'
import { SimulatorTransactionService } from '../../entities/simulatorTransaction/simulatorTransactionService'

interface SimulateReversalUseCaseInput {
  authorizationId: string
  amount: number
}

interface SimulateReversalUseCaseOutput {
  id: string
  billedAmount: CurrencyAmount
  createdAt: Date
  updatedAt: Date
}

export class SimulateReversalTransactionUseCase {
  constructor(
    private readonly simulatorTransactionService: SimulatorTransactionService,
  ) {}

  async execute(
    input: SimulateReversalUseCaseInput,
  ): Promise<SimulateReversalUseCaseOutput> {
    return await this.simulatorTransactionService.reverse(input)
  }
}
