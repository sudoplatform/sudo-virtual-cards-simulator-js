/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DefaultLogger } from '@sudoplatform/sudo-common'
import { VirtualCard } from '@sudoplatform/sudo-virtual-cards'
import { SudoVirtualCardsSimulatorClient } from '../../../src'
import { provisionVirtualCard } from '../util/provisionVirtualCard'
import { setupVirtualCardsSimulatorClient } from '../util/virtualCardsSimulatorClientLifecycle'

describe('SudoVirtualCardsSimulatorClient SimulateAuthorization Test Suite', () => {
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

  describe('simulateAuthorization', () => {
    it('returns expected result', async () => {
      const merchant = await instanceUnderTest.listSimulatorMerchants()
      if (!merchant.length) {
        fail('failed to get merchant')
      }
      await expect(
        instanceUnderTest.simulateAuthorization({
          pan: card.pan,
          amount: 50,
          merchantId: merchant[0].id,
          expiry: card.expiry,
          billingAddress: card.billingAddress,
          csc: card.csc,
        }),
      ).resolves.toBeDefined()
    })
  })
})
