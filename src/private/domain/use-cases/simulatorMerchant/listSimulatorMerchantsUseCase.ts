/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CachePolicy } from '@sudoplatform/sudo-common'
import { SimulatorMerchantService } from '../../entities/simulatorMerchant/simulatorMerchantService'

interface ListSimulatorMerchantsUseCaseInput {
  cachePolicy?: CachePolicy
}

type ListSimulatorMerchantsUseCaseOutput = {
  id: string
  createdAt: Date
  updatedAt: Date
  description: string
  name: string
  mcc: string
  city: string
  state?: string
  postalCode: string
  country: string
  currency: string
  declineAfterAuthorization: boolean
  declineBeforeAuthorization: boolean
}[]

export class ListSimulatorMerchantsUseCase {
  constructor(
    private readonly simulatorMerchantService: SimulatorMerchantService,
  ) {}

  async execute(
    input?: ListSimulatorMerchantsUseCaseInput,
  ): Promise<ListSimulatorMerchantsUseCaseOutput> {
    return await this.simulatorMerchantService.listMerchants(input)
  }
}
