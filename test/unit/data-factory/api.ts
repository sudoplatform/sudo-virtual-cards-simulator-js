/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CurrencyAmount,
  SimulateAuthorizationExpiryOutput,
  SimulateAuthorizationOutput,
  SimulateDebitOutput,
  SimulateRefundOutput,
  SimulateReversalOutput,
  SimulatorMerchant,
} from '../../../src'

export class ApiDataFactory {
  private static readonly commonProps = {
    id: 'dummyId',
    createdAt: new Date(1.0),
    updatedAt: new Date(2.0),
  }

  static readonly simulatorMerchant: SimulatorMerchant = {
    ...ApiDataFactory.commonProps,
    currency: 'dummyCurrency',
    city: 'dummyCity',
    country: 'dummyCountry',
    declineAfterAuthorization: true,
    declineBeforeAuthorization: true,
    description: 'dummyDescription',
    mcc: 'dummyMCC',
    name: 'dummyName',
    postalCode: 'dummyPostalCode',
    state: 'dummyState',
  }

  static readonly currencyAmount: CurrencyAmount = {
    currency: 'dummyCurrency',
    amount: 100,
  }

  static readonly simulateAuthorizationOutput: SimulateAuthorizationOutput = {
    ...this.commonProps,
    approved: true,
    billed: ApiDataFactory.currencyAmount,
    billedAmount: ApiDataFactory.currencyAmount,
    declineReason: 'dummyDeclineReason',
  }
  static readonly simulateReversalOutput: SimulateReversalOutput = {
    ...this.commonProps,
    billedAmount: ApiDataFactory.currencyAmount,
  }

  static readonly simulateAuthorizationExpiryOutput: SimulateAuthorizationExpiryOutput =
    {
      ...this.commonProps,
    }

  static readonly simulateRefundOutput: SimulateRefundOutput = {
    ...this.commonProps,
    billedAmount: ApiDataFactory.currencyAmount,
  }

  static readonly simulateDebitOutput: SimulateDebitOutput = {
    ...this.commonProps,
    billedAmount: ApiDataFactory.currencyAmount,
  }
}
