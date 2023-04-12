/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DefaultLogger } from '@sudoplatform/sudo-common'
import { VirtualCard } from '@sudoplatform/sudo-virtual-cards'
import { v4 } from 'uuid'
import { SudoVirtualCardsSimulatorClient } from '../../../src'
import { TransactionNotFoundError } from '../../../src/public/errors'
import { provisionVirtualCard } from '../util/provisionVirtualCard'
import { setupVirtualCardsSimulatorClient } from '../util/virtualCardsSimulatorClientLifecycle'

describe('SudoVirtualCardsSimulatorClient SimulateAuthorizationExpiry Test Suite', () => {
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

  describe('simulateAuthorizationExpiry', () => {
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
        instanceUnderTest.simulateAuthorizationExpiry({
          authorizationId: initial.id,
        }),
      ).resolves.toBeDefined()
    })

    it('throws on invalid id', async () => {
      await expect(
        instanceUnderTest.simulateAuthorizationExpiry({
          authorizationId: v4(),
        }),
      ).rejects.toThrow(TransactionNotFoundError)
    })
  })
})
