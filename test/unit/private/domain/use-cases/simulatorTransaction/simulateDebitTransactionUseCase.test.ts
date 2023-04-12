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
import { SimulateDebitTransactionUseCase } from '../../../../../../src/private/domain/use-cases/simulatorTransaction/simulateDebitTransactionUseCase'
import { EntityDataFactory } from '../../../../data-factory/entity'

describe('SimulateDebitTransactionUseCase Test Suite', () => {
  let instanceUnderTest: SimulateDebitTransactionUseCase
  const mockSimulatorTransactionService = mock<SimulatorTransactionService>()

  beforeEach(() => {
    reset(mockSimulatorTransactionService)
    instanceUnderTest = new SimulateDebitTransactionUseCase(
      instance(mockSimulatorTransactionService),
    )
  })

  describe('execute', () => {
    beforeEach(() => {
      when(mockSimulatorTransactionService.debit(anything())).thenResolve(
        EntityDataFactory.simulatorDebitTransactionEntity,
      )
    })
    it('completes successfully', async () => {
      const amount = 100
      const authorizationId = v4()
      const result = await instanceUnderTest.execute({
        amount,
        authorizationId,
      })
      verify(mockSimulatorTransactionService.debit(anything())).once()
      const [args] = capture(mockSimulatorTransactionService.debit).first()
      expect(args).toStrictEqual<typeof args>({
        amount,
        authorizationId,
      })
      expect(result).toStrictEqual(
        EntityDataFactory.simulatorDebitTransactionEntity,
      )
    })
  })
})
