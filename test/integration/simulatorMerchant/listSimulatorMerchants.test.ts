/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DefaultLogger } from '@sudoplatform/sudo-common'
import { SudoVirtualCardsSimulatorClient } from '../../../src'
import { setupVirtualCardsSimulatorClient } from '../util/virtualCardsSimulatorClientLifecycle'

describe('SudoVirtualCardsSimulatorClient ListSimulatorMerchants Test Suite', () => {
  jest.setTimeout(240000)
  const log = new DefaultLogger('SudoVirtualCardsClientIntegrationTests')

  let instanceUnderTest: SudoVirtualCardsSimulatorClient

  beforeEach(async () => {
    instanceUnderTest = (await setupVirtualCardsSimulatorClient(log))
      .virtualCardsSimulatorClient
  })

  describe('listSimulatorMerchants', () => {
    it('returns expected result', async () => {
      const result = await instanceUnderTest.listSimulatorMerchants()
      expect(result.length).toBeGreaterThanOrEqual(1)
    })
  })
})
