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
import { ApiClient } from '../../../../../src/private/data/common/apiClient'
import { DefaultSimulatorMerchantService } from '../../../../../src/private/data/simulatorMerchant/defaultSimulatorMerchantService'
import { GraphQLDataFactory } from '../../../data-factory/graphQl'

describe('DefaultSimulatorMerchantService Test Suite', () => {
  let instanceUnderTest: DefaultSimulatorMerchantService
  const mockAppSync = mock<ApiClient>()

  beforeEach(() => {
    reset(mockAppSync)
    instanceUnderTest = new DefaultSimulatorMerchantService(
      instance(mockAppSync),
    )
  })

  describe('listMerchants', () => {
    beforeEach(() => {
      when(mockAppSync.listSimulatorMerchants(anything())).thenResolve([
        GraphQLDataFactory.simulatorMerchant,
      ])
    })
    it('calls app sync list', async () => {
      const cachePolicy = CachePolicy.CacheOnly
      await instanceUnderTest.listMerchants({
        cachePolicy,
      })
      verify(mockAppSync.listSimulatorMerchants(anything())).once()
      const [args] = capture(mockAppSync.listSimulatorMerchants).first()
      expect(args).toStrictEqual<typeof args>('cache-only')
    })
  })
  describe('listConversionRates', () => {
    beforeEach(() => {
      when(mockAppSync.listSimulatorConversionRates(anything())).thenResolve([
        GraphQLDataFactory.currencyAmount,
      ])
    })
    it('calls app sync list', async () => {
      const cachePolicy = CachePolicy.CacheOnly
      await instanceUnderTest.listConversionRates({
        cachePolicy,
      })
      verify(mockAppSync.listSimulatorConversionRates(anything())).once()
      const [args] = capture(mockAppSync.listSimulatorConversionRates).first()
      expect(args).toStrictEqual<typeof args>('cache-only')
    })
  })
})
