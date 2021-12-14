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
import { SimulateAuthorizationExpiryTransactionUseCase } from '../../../../../../src/private/domain/use-cases/simulatorTransaction/simulateAuthorizationExpiryTransactionUseCase'
import { EntityDataFactory } from '../../../../data-factory/entity'

describe('SimulateAuthorizationExpiryTransactionUseCase Test Suite', () => {
  let instanceUnderTest: SimulateAuthorizationExpiryTransactionUseCase
  const mockSimulatorTransactionService = mock<SimulatorTransactionService>()

  beforeEach(() => {
    reset(mockSimulatorTransactionService)
    instanceUnderTest = new SimulateAuthorizationExpiryTransactionUseCase(
      instance(mockSimulatorTransactionService),
    )
  })

  describe('execute', () => {
    beforeEach(() => {
      when(
        mockSimulatorTransactionService.expireAuthorization(anything()),
      ).thenResolve(
        EntityDataFactory.simulatorAuthorizationExpiryTransactionEntity,
      )
    })
    it('completes successfully', async () => {
      const authorizationId = v4()
      const result = await instanceUnderTest.execute({
        authorizationId,
      })
      verify(
        mockSimulatorTransactionService.expireAuthorization(anything()),
      ).once()
      const [args] = capture(
        mockSimulatorTransactionService.expireAuthorization,
      ).first()
      expect(args).toStrictEqual<typeof args>({
        authorizationId,
      })
      expect(result).toStrictEqual(
        EntityDataFactory.simulatorAuthorizationExpiryTransactionEntity,
      )
    })
  })
})
