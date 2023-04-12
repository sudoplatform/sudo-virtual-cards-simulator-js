/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CachePolicy } from '@sudoplatform/sudo-common'
import {
  anything,
  capture,
  instance,
  mock,
  reset,
  verify,
  when,
} from 'ts-mockito'
import { SimulatorMerchantService } from '../../../../../../src/private/domain/entities/simulatorMerchant/simulatorMerchantService'
import { ListSimulatorMerchantsUseCase } from '../../../../../../src/private/domain/use-cases/simulatorMerchant/listSimulatorMerchantsUseCase'
import { EntityDataFactory } from '../../../../data-factory/entity'

describe('ListSimulatorMerchantsUseCase Test Suite', () => {
  let instanceUnderTest: ListSimulatorMerchantsUseCase
  const mockSimulatorMerchantService = mock<SimulatorMerchantService>()

  beforeEach(() => {
    reset(mockSimulatorMerchantService)
    instanceUnderTest = new ListSimulatorMerchantsUseCase(
      instance(mockSimulatorMerchantService),
    )
  })

  describe('execute', () => {
    beforeEach(() => {
      when(mockSimulatorMerchantService.listMerchants(anything())).thenResolve([
        EntityDataFactory.simulatorMerchant,
      ])
    })
    it('completes successfully', async () => {
      const result = await instanceUnderTest.execute({
        cachePolicy: CachePolicy.CacheOnly,
      })
      verify(mockSimulatorMerchantService.listMerchants(anything())).once()
      const [args] = capture(mockSimulatorMerchantService.listMerchants).first()
      expect(args).toStrictEqual<typeof args>({
        cachePolicy: CachePolicy.CacheOnly,
      })
      expect(result).toStrictEqual([EntityDataFactory.simulatorMerchant])
    })
  })
})
