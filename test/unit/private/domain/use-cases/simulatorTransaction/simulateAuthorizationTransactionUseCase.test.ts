import { IllegalArgumentError } from '@sudoplatform/sudo-common'
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
import { SimulateAuthorizationTransactionUseCase } from '../../../../../../src/private/domain/use-cases/simulatorTransaction/simulateAuthorizationTransactionUseCase'
import { EntityDataFactory } from '../../../../data-factory/entity'

describe('SimulateAuthorizationTransactionUseCase Test Suite', () => {
  let instanceUnderTest: SimulateAuthorizationTransactionUseCase
  const mockSimulatorTransactionService = mock<SimulatorTransactionService>()

  beforeEach(() => {
    reset(mockSimulatorTransactionService)
    instanceUnderTest = new SimulateAuthorizationTransactionUseCase(
      instance(mockSimulatorTransactionService),
    )
  })

  describe('execute', () => {
    beforeEach(() => {
      when(mockSimulatorTransactionService.authorize(anything())).thenResolve(
        EntityDataFactory.simulatorAuthorizeTransactionEntity,
      )
    })
    it('completes successfully', async () => {
      const amount = 100
      const billingAddress = {
        addressLine1: v4(),
        addressLine2: v4(),
        city: v4(),
        country: v4(),
        postalCode: v4(),
        state: v4(),
      }
      const csc = v4()
      const expiry = {
        mm: '1',
        yyyy: '2022',
      }
      const merchantId = v4()
      const pan = v4()
      const result = await instanceUnderTest.execute({
        amount,
        billingAddress,
        csc,
        expiry,
        merchantId,
        pan,
      })
      verify(mockSimulatorTransactionService.authorize(anything())).once()
      const [args] = capture(mockSimulatorTransactionService.authorize).first()
      expect(args).toStrictEqual<typeof args>({
        amount,
        billingAddress,
        csc,
        expiry: { mm: 1, yyyy: 2022 },
        merchantId,
        pan,
      })
      expect(result).toStrictEqual(
        EntityDataFactory.simulatorAuthorizeTransactionEntity,
      )
    })
    it('throws an IllegalArgumentError if expiry mm is not number', async () => {
      await expect(
        instanceUnderTest.execute({
          amount: 50,
          expiry: { mm: v4(), yyyy: '2022' },
          merchantId: '',
          pan: '',
        }),
      ).rejects.toThrow(IllegalArgumentError)
    })
    it('throws an IllegalArgumentError if expiry yyyy is not number', async () => {
      await expect(
        instanceUnderTest.execute({
          amount: 50,
          expiry: { mm: '1', yyyy: v4() },
          merchantId: '',
          pan: '',
        }),
      ).rejects.toThrow(IllegalArgumentError)
    })
  })
})
