/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CurrencyAmount } from '../../../..'
import { SimulatorTransactionService } from '../../entities/simulatorTransaction/simulatorTransactionService'

interface SimulateRefundUseCaseInput {
  debitId: string
  amount: number
}

interface SimulateRefundUseCaseOutput {
  id: string
  billedAmount: CurrencyAmount
  createdAt: Date
  updatedAt: Date
}

export class SimulateRefundTransactionUseCase {
  constructor(
    private readonly simulatorTransactionService: SimulatorTransactionService,
  ) {}

  async execute(
    input: SimulateRefundUseCaseInput,
  ): Promise<SimulateRefundUseCaseOutput> {
    return await this.simulatorTransactionService.refund(input)
  }
}
