/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { IllegalArgumentError } from '@sudoplatform/sudo-common'
import { SimulatorAuthorizeTransactionEntity } from '../../entities/simulatorTransaction/simulatorAuthorizeTransactionEntity'
import { SimulatorTransactionService } from '../../entities/simulatorTransaction/simulatorTransactionService'

interface SimulateAuthorizationTransactionUseCaseInput {
  pan: string
  amount: number
  merchantId: string
  expiry: { mm: string; yyyy: string }
  billingAddress?: {
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  csc?: string
}

type SimulateAuthorizationTransactionUseCaseOutput =
  SimulatorAuthorizeTransactionEntity

export class SimulateAuthorizationTransactionUseCase {
  constructor(
    private readonly simulatorTransactionService: SimulatorTransactionService,
  ) {}

  async execute(
    input: SimulateAuthorizationTransactionUseCaseInput,
  ): Promise<SimulateAuthorizationTransactionUseCaseOutput> {
    const expiryMM = Number(input.expiry.mm)
    const expiryYYYY = Number(input.expiry.yyyy)
    if (isNaN(expiryMM)) {
      throw new IllegalArgumentError('Expiry MM must be an integer number')
    }
    if (isNaN(expiryYYYY)) {
      throw new IllegalArgumentError('Expiry YYYY must be an integer number')
    }
    return await this.simulatorTransactionService.authorize({
      ...input,
      expiry: { mm: expiryMM, yyyy: expiryYYYY },
    })
  }
}
