/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SimulatorAuthorizeTransactionEntity } from '../../entities/simulatorTransaction/simulatorAuthorizeTransactionEntity'
import { SimulatorTransactionService } from '../../entities/simulatorTransaction/simulatorTransactionService'

interface SimulateIncrementalAuthorizationTransactionUseCaseInput {
  amount: number
  authorizationId: string
}

type SimulateIncrementalAuthorizationTransactionUseCaseOutput =
  SimulatorAuthorizeTransactionEntity

export class SimulateIncrementalAuthorizationTransactionUseCase {
  constructor(
    private readonly simulatorTransactionService: SimulatorTransactionService,
  ) {}

  async execute(
    input: SimulateIncrementalAuthorizationTransactionUseCaseInput,
  ): Promise<SimulateIncrementalAuthorizationTransactionUseCaseOutput> {
    return await this.simulatorTransactionService.incrementalAuthorize(input)
  }
}
