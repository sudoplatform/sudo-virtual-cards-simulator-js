import { DefaultLogger } from '@sudoplatform/sudo-common'
import { VirtualCard } from '@sudoplatform/sudo-virtual-cards'
import { v4 } from 'uuid'
import { SudoVirtualCardsSimulatorClient } from '../../../src'
import { TransactionNotFoundError } from '../../../src/public/errors'
import { provisionVirtualCard } from '../util/provisionVirtualCard'
import { setupVirtualCardsSimulatorClient } from '../util/virtualCardsSimulatorClientLifecycle'

describe('SudoVirtualCardsSimulatorClient SimulateIncrementalAuthorization Test Suite', () => {
  jest.setTimeout(240000)
  const log = new DefaultLogger('SudoVirtualCardsClientIntegrationTests')

  let instanceUnderTest: SudoVirtualCardsSimulatorClient

  let card: VirtualCard

  beforeAll(async () => {
    const {
      virtualCardsSimulatorClient,
      virtualCardsClient,
      profilesClient,
      sudo,
      stripe,
    } = await setupVirtualCardsSimulatorClient(log)
    instanceUnderTest = virtualCardsSimulatorClient
    card = await provisionVirtualCard(
      virtualCardsClient,
      profilesClient,
      sudo,
      stripe,
    )
  })

  describe('simulateIncrementalAuthorization', () => {
    it('returns expected result', async () => {
      const merchant = await instanceUnderTest.listSimulatorMerchants()
      if (!merchant.length) {
        fail('failed to get merchant')
      }
      const initial = await instanceUnderTest.simulateAuthorization({
        pan: card.pan,
        amount: 50,
        merchantId: merchant[0].id,
        expiry: card.expiry,
        billingAddress: card.billingAddress,
        csc: card.csc,
      })
      await expect(
        instanceUnderTest.simulateIncrementalAuthorization({
          authorizationId: initial.id,
          amount: 50,
        }),
      ).resolves.toBeDefined()
    })

    it('throws on invalid id', async () => {
      await expect(
        instanceUnderTest.simulateIncrementalAuthorization({
          amount: 50,
          authorizationId: v4(),
        }),
      ).rejects.toThrow(TransactionNotFoundError)
    })
  })
})
