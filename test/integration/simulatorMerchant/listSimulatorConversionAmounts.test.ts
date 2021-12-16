import { DefaultLogger } from '@sudoplatform/sudo-common'
import { SudoVirtualCardsSimulatorClient } from '../../../src'
import { setupVirtualCardsSimulatorClient } from '../util/virtualCardsSimulatorClientLifecycle'

describe('SudoVirtualCardsSimulatorClient ListSimulatorConversionAmounts Test Suite', () => {
  jest.setTimeout(240000)
  const log = new DefaultLogger('SudoVirtualCardsClientIntegrationTests')

  let instanceUnderTest: SudoVirtualCardsSimulatorClient

  beforeEach(async () => {
    instanceUnderTest = (await setupVirtualCardsSimulatorClient(log))
      .virtualCardsSimulatorClient
  })

  describe('listSimulatorConversionRates', () => {
    it('returns expected result', async () => {
      const result = await instanceUnderTest.listSimulatorConversionRates()
      expect(result.length).toBeGreaterThanOrEqual(1)
    })
  })
})
