/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  anything,
  capture,
  instance,
  mock,
  reset,
  verify,
  when,
} from 'ts-mockito'
import { v4 } from 'uuid'
import { ApiClient } from '../../../../../src/private/data/common/apiClient'
import { DefaultSimulatorTransactionService } from '../../../../../src/private/data/simulatorTransaction/defaultSimulatorTransactionService'
import { EntityDataFactory } from '../../../data-factory/entity'
import { GraphQLDataFactory } from '../../../data-factory/graphQl'

describe('DefaultSimulatorTransactionService Test Suite', () => {
  let instanceUnderTest: DefaultSimulatorTransactionService
  const mockAppSync = mock<ApiClient>()

  beforeEach(() => {
    reset(mockAppSync)
    instanceUnderTest = new DefaultSimulatorTransactionService(
      instance(mockAppSync),
    )
  })

  describe('authorize', () => {
    beforeEach(() => {
      when(mockAppSync.simulateAuthorization(anything())).thenResolve(
        GraphQLDataFactory.simulateAuthorizationResponse,
      )
    })
    it('calls appsync authorize', async () => {
      const pan = v4()
      const amount = 10
      const merchantId = v4()
      const expiry = {
        mm: 1,
        yyyy: 1,
      }
      const billingAddress = {
        addressLine1: v4(),
        addressLine2: v4(),
        city: v4(),
        country: v4(),
        postalCode: v4(),
        state: v4(),
      }
      const csc = v4()
      await instanceUnderTest.authorize({
        pan,
        amount,
        merchantId,
        expiry,
        billingAddress,
        csc,
      })
      verify(mockAppSync.simulateAuthorization(anything())).once()
      const [args] = capture(mockAppSync.simulateAuthorization).first()
      expect(args).toStrictEqual<typeof args>({
        pan,
        amount,
        merchantId,
        expiry,
        billingAddress,
        csc,
      })
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.authorize({
          pan: '',
          amount: 50,
          merchantId: '',
          expiry: { mm: 1, yyyy: 2 },
        }),
      ).resolves.toStrictEqual(
        EntityDataFactory.simulatorAuthorizeTransactionEntity,
      )
    })
  })
  describe('incrementalAuthorize', () => {
    beforeEach(() => {
      when(
        mockAppSync.simulateIncrementalAuthorization(anything()),
      ).thenResolve(GraphQLDataFactory.simulateAuthorizationResponse)
    })
    it('calls appsync incrementalAuthorize', async () => {
      const authorizationId = v4()
      const amount = 10
      await instanceUnderTest.incrementalAuthorize({
        amount,
        authorizationId,
      })
      verify(mockAppSync.simulateIncrementalAuthorization(anything())).once()
      const [args] = capture(
        mockAppSync.simulateIncrementalAuthorization,
      ).first()
      expect(args).toStrictEqual<typeof args>({
        amount,
        authorizationId,
      })
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.incrementalAuthorize({
          authorizationId: '',
          amount: 50,
        }),
      ).resolves.toStrictEqual(
        EntityDataFactory.simulatorAuthorizeTransactionEntity,
      )
    })
  })
  describe('reverse', () => {
    beforeEach(() => {
      when(mockAppSync.simulateReversal(anything())).thenResolve(
        GraphQLDataFactory.simulateReversalResponse,
      )
    })
    it('calls appsync reverse', async () => {
      const authorizationId = v4()
      const amount = 10
      await instanceUnderTest.reverse({
        amount,
        authorizationId,
      })
      verify(mockAppSync.simulateReversal(anything())).once()
      const [args] = capture(mockAppSync.simulateReversal).first()
      expect(args).toStrictEqual<typeof args>({
        amount,
        authorizationId,
      })
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.reverse({
          authorizationId: '',
          amount: 50,
        }),
      ).resolves.toStrictEqual(
        EntityDataFactory.simulatorReversalTransactionEntity,
      )
    })
  })
  describe('expireAuthorization', () => {
    beforeEach(() => {
      when(mockAppSync.simulateAuthorizationExpiry(anything())).thenResolve(
        GraphQLDataFactory.simulateAuthorizationExpiryResponse,
      )
    })
    it('calls appsync expireAuthorization', async () => {
      const authorizationId = v4()
      await instanceUnderTest.expireAuthorization({
        authorizationId,
      })
      verify(mockAppSync.simulateAuthorizationExpiry(anything())).once()
      const [args] = capture(mockAppSync.simulateAuthorizationExpiry).first()
      expect(args).toStrictEqual<typeof args>({
        authorizationId,
      })
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.expireAuthorization({
          authorizationId: '',
        }),
      ).resolves.toStrictEqual(
        EntityDataFactory.simulatorAuthorizationExpiryTransactionEntity,
      )
    })
  })
  describe('refund', () => {
    beforeEach(() => {
      when(mockAppSync.simulateRefund(anything())).thenResolve(
        GraphQLDataFactory.simulateRefundResponse,
      )
    })
    it('calls appsync refund', async () => {
      const debitId = v4()
      const amount = 10
      await instanceUnderTest.refund({
        amount,
        debitId,
      })
      verify(mockAppSync.simulateRefund(anything())).once()
      const [args] = capture(mockAppSync.simulateRefund).first()
      expect(args).toStrictEqual<typeof args>({
        amount,
        debitId,
      })
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.refund({
          debitId: '',
          amount: 50,
        }),
      ).resolves.toStrictEqual(
        EntityDataFactory.simulatorRefundTransactionEntity,
      )
    })
  })
  describe('debit', () => {
    beforeEach(() => {
      when(mockAppSync.simulateDebit(anything())).thenResolve(
        GraphQLDataFactory.simulateDebitResponse,
      )
    })
    it('calls appsync debit', async () => {
      const authorizationId = v4()
      const amount = 10
      await instanceUnderTest.debit({
        amount,
        authorizationId,
      })
      verify(mockAppSync.simulateDebit(anything())).once()
      const [args] = capture(mockAppSync.simulateDebit).first()
      expect(args).toStrictEqual<typeof args>({
        amount,
        authorizationId,
      })
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.debit({
          authorizationId: '',
          amount: 50,
        }),
      ).resolves.toStrictEqual(
        EntityDataFactory.simulatorDebitTransactionEntity,
      )
    })
  })
})
