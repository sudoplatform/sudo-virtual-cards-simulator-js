/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  isStripeCardFundingSourceClientConfiguration,
  SudoVirtualCardsClient,
} from '@sudoplatform/sudo-virtual-cards'
import Stripe from 'stripe'

export const getStripe = async (
  vcClient: SudoVirtualCardsClient,
): Promise<Stripe> => {
  const config = await vcClient.getFundingSourceClientConfiguration()

  for (const fsConfig of config) {
    if (isStripeCardFundingSourceClientConfiguration(fsConfig)) {
      return new Stripe(fsConfig.apiKey, {
        apiVersion: '2022-08-01',
        typescript: true,
      })
    }
  }

  throw 'Stripe config not found'
}
