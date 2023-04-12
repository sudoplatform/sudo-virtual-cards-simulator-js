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
import { SimulateRefundTransactionUseCase } from '../../../../../../src/private/domain/use-cases/simulatorTransaction/simulateRefundTransactionUseCase'
import { EntityDataFactory } from '../../../../data-factory/entity'

describe('SimulateRefundTransactionUseCase Test Suite', () => {
  let instanceUnderTest: SimulateRefundTransactionUseCase
  const mockSimulatorTransactionService = mock<SimulatorTransactionService>()

  beforeEach(() => {
    reset(mockSimulatorTransactionService)
    instanceUnderTest = new SimulateRefundTransactionUseCase(
      instance(mockSimulatorTransactionService),
    )
  })

  describe('execute', () => {
    beforeEach(() => {
      when(mockSimulatorTransactionService.refund(anything())).thenResolve(
        EntityDataFactory.simulatorRefundTransactionEntity,
      )
    })
    it('completes successfully', async () => {
      const amount = 100
      const debitId = v4()
      const result = await instanceUnderTest.execute({
        amount,
        debitId,
      })
      verify(mockSimulatorTransactionService.refund(anything())).once()
      const [args] = capture(mockSimulatorTransactionService.refund).first()
      expect(args).toStrictEqual<typeof args>({
        amount,
        debitId,
      })
      expect(result).toStrictEqual(
        EntityDataFactory.simulatorRefundTransactionEntity,
      )
    })
  })
})
