/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SimulatorTransactionService } from '../../entities/simulatorTransaction/simulatorTransactionService'

interface SimulateAuthorizationExpiryUseCaseInput {
  authorizationId: string
}

interface SimulateAuthorizationExpiryUseCaseOutput {
  id: string
  createdAt: Date
  updatedAt: Date
}

export class SimulateAuthorizationExpiryTransactionUseCase {
  constructor(
    private readonly simulatorTransactionService: SimulatorTransactionService,
  ) {}

  async execute(
    input: SimulateAuthorizationExpiryUseCaseInput,
  ): Promise<SimulateAuthorizationExpiryUseCaseOutput> {
    return await this.simulatorTransactionService.expireAuthorization(input)
  }
}
