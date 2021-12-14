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
import { SimulateReversalTransactionUseCase } from '../../../../../../src/private/domain/use-cases/simulatorTransaction/simulateReversalTransactionUseCase'
import { EntityDataFactory } from '../../../../data-factory/entity'

describe('SimulateReversalTransactionUseCase Test Suite', () => {
  let instanceUnderTest: SimulateReversalTransactionUseCase
  const mockSimulatorTransactionService = mock<SimulatorTransactionService>()

  beforeEach(() => {
    reset(mockSimulatorTransactionService)
    instanceUnderTest = new SimulateReversalTransactionUseCase(
      instance(mockSimulatorTransactionService),
    )
  })

  describe('execute', () => {
    beforeEach(() => {
      when(mockSimulatorTransactionService.reverse(anything())).thenResolve(
        EntityDataFactory.simulatorReversalTransactionEntity,
      )
    })
    it('completes successfully', async () => {
      const amount = 100
      const authorizationId = v4()
      const result = await instanceUnderTest.execute({
        amount,
        authorizationId,
      })
      verify(mockSimulatorTransactionService.reverse(anything())).once()
      const [args] = capture(mockSimulatorTransactionService.reverse).first()
      expect(args).toStrictEqual<typeof args>({
        amount,
        authorizationId,
      })
      expect(result).toStrictEqual(
        EntityDataFactory.simulatorReversalTransactionEntity,
      )
    })
  })
})
