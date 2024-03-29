/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DefaultLogger } from '@sudoplatform/sudo-common'
import { VirtualCard } from '@sudoplatform/sudo-virtual-cards'
import { v4 } from 'uuid'
import {
  SimulateAuthorizationOutput,
  SimulateDebitOutput,
  SudoVirtualCardsSimulatorClient,
  TransactionNotFoundError,
} from '../../../src'
import { provisionVirtualCard } from '../util/provisionVirtualCard'
import { setupVirtualCardsSimulatorClient } from '../util/virtualCardsSimulatorClientLifecycle'

describe('SudoVirtualCardsSimulatorClient SimulateDebit Test Suite', () => {
  jest.setTimeout(240000)
  const log = new DefaultLogger('SudoVirtualCardsClientIntegrationTests')

  let instanceUnderTest: SudoVirtualCardsSimulatorClient

  let card: VirtualCard
  let authorizationTransaction: SimulateAuthorizationOutput
  let debitTransaction: SimulateDebitOutput

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
    const merchant = await instanceUnderTest.listSimulatorMerchants()
    if (!merchant.length) {
      fail('failed to get merchant')
    }
    authorizationTransaction = await instanceUnderTest.simulateAuthorization({
      pan: card.pan,
      amount: 50,
      merchantId: merchant[0].id,
      expiry: card.expiry,
      billingAddress: card.billingAddress,
      csc: card.csc,
    })
    debitTransaction = await instanceUnderTest.simulateDebit({
      authorizationId: authorizationTransaction.id,
      amount: 50,
    })
  })

  describe('simulateDebit', () => {
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.simulateRefund({
          debitId: debitTransaction.id,
          amount: 50,
        }),
      ).resolves.toBeDefined()
    })
    it('throws on invalid id', async () => {
      await expect(
        instanceUnderTest.simulateDebit({
          amount: 50,
          authorizationId: v4(),
        }),
      ).rejects.toThrow(TransactionNotFoundError)
    })
  })
})
