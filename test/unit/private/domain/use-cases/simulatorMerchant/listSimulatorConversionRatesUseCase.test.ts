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
import { ListSimulatorConversionRatesUseCase } from '../../../../../../src/private/domain/use-cases/simulatorMerchant/listSimulatorConversionRatesUseCase'
import { EntityDataFactory } from '../../../../data-factory/entity'

describe('ListSimulatorConversionRatesUseCase Test Suite', () => {
  let instanceUnderTest: ListSimulatorConversionRatesUseCase
  const mockSimulatorMerchantService = mock<SimulatorMerchantService>()

  beforeEach(() => {
    reset(mockSimulatorMerchantService)
    instanceUnderTest = new ListSimulatorConversionRatesUseCase(
      instance(mockSimulatorMerchantService),
    )
  })

  describe('execute', () => {
    beforeEach(() => {
      when(
        mockSimulatorMerchantService.listConversionRates(anything()),
      ).thenResolve([EntityDataFactory.currencyAmount])
    })
    it('completes successfully', async () => {
      const result = await instanceUnderTest.execute({
        cachePolicy: CachePolicy.CacheOnly,
      })
      verify(
        mockSimulatorMerchantService.listConversionRates(anything()),
      ).once()
      const [args] = capture(
        mockSimulatorMerchantService.listConversionRates,
      ).first()
      expect(args).toStrictEqual<typeof args>({
        cachePolicy: CachePolicy.CacheOnly,
      })
      expect(result).toStrictEqual([EntityDataFactory.currencyAmount])
    })
  })
})
