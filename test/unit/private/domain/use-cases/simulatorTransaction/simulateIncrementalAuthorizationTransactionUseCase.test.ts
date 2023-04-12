/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  anything,
  capture,
  instance,
  mock,
  reset,
  verify,
  when,
} from 'ts-mockito'
import { v4 } from 'uuid'
import { SimulatorTransactionService } from '../../../../../../src/private/domain/entities/simulatorTransaction/simulatorTransactionService'
import { SimulateIncrementalAuthorizationTransactionUseCase } from '../../../../../../src/private/domain/use-cases/simulatorTransaction/simulateIncrementalAuthorizationTransactionUseCase'
import { EntityDataFactory } from '../../../../data-factory/entity'

describe('SimulateIncrementalAuthorizationTransactionUseCase Test Suite', () => {
  let instanceUnderTest: SimulateIncrementalAuthorizationTransactionUseCase
  const mockSimulatorTransactionService = mock<SimulatorTransactionService>()

  beforeEach(() => {
    reset(mockSimulatorTransactionService)
    instanceUnderTest = new SimulateIncrementalAuthorizationTransactionUseCase(
      instance(mockSimulatorTransactionService),
    )
  })

  describe('execute', () => {
    beforeEach(() => {
      when(
        mockSimulatorTransactionService.incrementalAuthorize(anything()),
      ).thenResolve(EntityDataFactory.simulatorAuthorizeTransactionEntity)
    })
    it('completes successfully', async () => {
      const amount = 100
      const authorizationId = v4()
      const result = await instanceUnderTest.execute({
        amount,
        authorizationId,
      })
      verify(
        mockSimulatorTransactionService.incrementalAuthorize(anything()),
      ).once()
      const [args] = capture(
        mockSimulatorTransactionService.incrementalAuthorize,
      ).first()
      expect(args).toStrictEqual<typeof args>({
        amount,
        authorizationId,
      })
      expect(result).toStrictEqual(
        EntityDataFactory.simulatorAuthorizeTransactionEntity,
      )
    })
  })
})
