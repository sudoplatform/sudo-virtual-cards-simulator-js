/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import AWSAppSyncClient from 'aws-appsync'
import { anything, instance, mock, reset, verify, when } from 'ts-mockito'
import { v4 } from 'uuid'
import {
  DefaultSudoVirtualCardsSimulatorClient,
  SudoVirtualCardsSimulatorClient,
} from '../../../src'
import { ApiClient } from '../../../src/private/data/common/apiClient'
import { DefaultSimulatorMerchantService } from '../../../src/private/data/simulatorMerchant/defaultSimulatorMerchantService'
import { DefaultSimulatorTransactionService } from '../../../src/private/data/simulatorTransaction/defaultSimulatorTransactionService'
import { ListSimulatorConversionRatesUseCase } from '../../../src/private/domain/use-cases/simulatorMerchant/listSimulatorConversionRatesUseCase'
import { ListSimulatorMerchantsUseCase } from '../../../src/private/domain/use-cases/simulatorMerchant/listSimulatorMerchantsUseCase'
import { SimulateAuthorizationExpiryTransactionUseCase } from '../../../src/private/domain/use-cases/simulatorTransaction/simulateAuthorizationExpiryTransactionUseCase'
import { SimulateAuthorizationTransactionUseCase } from '../../../src/private/domain/use-cases/simulatorTransaction/simulateAuthorizationTransactionUseCase'
import { SimulateDebitTransactionUseCase } from '../../../src/private/domain/use-cases/simulatorTransaction/simulateDebitTransactionUseCase'
import { SimulateIncrementalAuthorizationTransactionUseCase } from '../../../src/private/domain/use-cases/simulatorTransaction/simulateIncrementalAuthorizationTransactionUseCase'
import { SimulateRefundTransactionUseCase } from '../../../src/private/domain/use-cases/simulatorTransaction/simulateRefundTransactionUseCase'
import { SimulateReversalTransactionUseCase } from '../../../src/private/domain/use-cases/simulatorTransaction/simulateReversalTransactionUseCase'
import { ApiDataFactory } from '../data-factory/api'
import { EntityDataFactory } from '../data-factory/entity'

// Constructor mocks
jest.mock(
  '../../../src/private/data/simulatorMerchant/defaultSimulatorMerchantService',
)
const JestMockDefaultSimulatorMerchantService =
  DefaultSimulatorMerchantService as jest.MockedClass<
    typeof DefaultSimulatorMerchantService
  >
jest.mock(
  '../../../src/private/data/simulatorTransaction/defaultSimulatorTransactionService',
)
const JestMockDefaultSimulatorTransactionService =
  DefaultSimulatorTransactionService as jest.MockedClass<
    typeof DefaultSimulatorTransactionService
  >
jest.mock('../../../src/private/data/common/apiClient')
const JestMockApiClient = ApiClient as jest.MockedClass<typeof ApiClient>

// Use case Mocks
jest.mock(
  '../../../src/private/domain/use-cases/simulatorMerchant/listSimulatorMerchantsUseCase',
)
const JestMockListSimulatorMerchantsUseCase =
  ListSimulatorMerchantsUseCase as jest.MockedClass<
    typeof ListSimulatorMerchantsUseCase
  >
jest.mock(
  '../../../src/private/domain/use-cases/simulatorMerchant/listSimulatorConversionRatesUseCase',
)
const JestMockListSimulatorConversionRatesUseCase =
  ListSimulatorConversionRatesUseCase as jest.MockedClass<
    typeof ListSimulatorConversionRatesUseCase
  >
jest.mock(
  '../../../src/private/domain/use-cases/simulatorTransaction/simulateAuthorizationTransactionUseCase',
)
const JestMockSimulateAuthorizationTransactionUseCase =
  SimulateAuthorizationTransactionUseCase as jest.MockedClass<
    typeof SimulateAuthorizationTransactionUseCase
  >
jest.mock(
  '../../../src/private/domain/use-cases/simulatorTransaction/simulateIncrementalAuthorizationTransactionUseCase',
)
const JestMockSimulateIncrementalAuthorizationTransactionUseCase =
  SimulateIncrementalAuthorizationTransactionUseCase as jest.MockedClass<
    typeof SimulateIncrementalAuthorizationTransactionUseCase
  >
jest.mock(
  '../../../src/private/domain/use-cases/simulatorTransaction/simulateReversalTransactionUseCase',
)
const JestMockSimulateReversalTransactionUseCase =
  SimulateReversalTransactionUseCase as jest.MockedClass<
    typeof SimulateReversalTransactionUseCase
  >
jest.mock(
  '../../../src/private/domain/use-cases/simulatorTransaction/simulateAuthorizationExpiryTransactionUseCase',
)
const JestMockSimulateAuthorizationExpiryTransactionUseCase =
  SimulateAuthorizationExpiryTransactionUseCase as jest.MockedClass<
    typeof SimulateAuthorizationExpiryTransactionUseCase
  >
jest.mock(
  '../../../src/private/domain/use-cases/simulatorTransaction/simulateRefundTransactionUseCase',
)
const JestMockSimulateRefundTransactionUseCase =
  SimulateRefundTransactionUseCase as jest.MockedClass<
    typeof SimulateRefundTransactionUseCase
  >
jest.mock(
  '../../../src/private/domain/use-cases/simulatorTransaction/simulateDebitTransactionUseCase',
)
const JestMockSimulateDebitTransactionUseCase =
  SimulateDebitTransactionUseCase as jest.MockedClass<
    typeof SimulateDebitTransactionUseCase
  >

describe('SudoVirtualCardsSimulatorClient Test Suite', () => {
  // Opt Mocks
  const mockApiClient = mock<ApiClient>()
  const mockAppSync = mock<AWSAppSyncClient<NormalizedCacheObject>>()

  // Mocks generated inside of constructor
  const mockSimulatorMerchantService = mock<DefaultSimulatorMerchantService>()
  const mockSimulatorTransactionService =
    mock<DefaultSimulatorTransactionService>()

  // Use Case Mocks
  const mockListSimulatorMerchantsUseCase =
    mock<ListSimulatorMerchantsUseCase>()
  const mockSimulateAuthorizationUseCase =
    mock<SimulateAuthorizationTransactionUseCase>()
  const mockListSimulatorConversionRatesUseCase =
    mock<ListSimulatorConversionRatesUseCase>()
  const mockSimulateIncrementalAuthorizationUseCase =
    mock<SimulateIncrementalAuthorizationTransactionUseCase>()
  const mockSimulateReversalUseCase = mock<SimulateReversalTransactionUseCase>()
  const mockSimulateAuthorizationExpiryUseCase =
    mock<SimulateAuthorizationExpiryTransactionUseCase>()
  const mockSimulateRefundUseCase = mock<SimulateRefundTransactionUseCase>()
  const mockSimulateDebitUseCase = mock<SimulateDebitTransactionUseCase>()

  let instanceUnderTest: SudoVirtualCardsSimulatorClient

  const resetMocks = (): void => {
    reset(mockApiClient)
    reset(mockSimulatorMerchantService)
    reset(mockSimulatorTransactionService)

    reset(mockListSimulatorMerchantsUseCase)
    reset(mockListSimulatorConversionRatesUseCase)
    reset(mockSimulateAuthorizationUseCase)
    reset(mockSimulateIncrementalAuthorizationUseCase)
    reset(mockSimulateReversalUseCase)
    reset(mockSimulateAuthorizationExpiryUseCase)
    reset(mockSimulateRefundUseCase)
    reset(mockSimulateDebitUseCase)

    JestMockDefaultSimulatorMerchantService.mockClear()
    JestMockDefaultSimulatorTransactionService.mockClear()
    JestMockApiClient.mockClear()
    JestMockListSimulatorMerchantsUseCase.mockClear()
    JestMockListSimulatorConversionRatesUseCase.mockClear()
    JestMockSimulateAuthorizationTransactionUseCase.mockClear()
    JestMockSimulateIncrementalAuthorizationTransactionUseCase.mockClear()
    JestMockSimulateReversalTransactionUseCase.mockClear()
    JestMockSimulateAuthorizationExpiryTransactionUseCase.mockClear()
    JestMockSimulateRefundTransactionUseCase.mockClear()
    JestMockSimulateDebitTransactionUseCase.mockClear()

    JestMockDefaultSimulatorMerchantService.mockImplementation(() =>
      instance(mockSimulatorMerchantService),
    )
    JestMockDefaultSimulatorTransactionService.mockImplementation(() =>
      instance(mockSimulatorTransactionService),
    )

    JestMockListSimulatorMerchantsUseCase.mockImplementation(() =>
      instance(mockListSimulatorMerchantsUseCase),
    )
    JestMockListSimulatorConversionRatesUseCase.mockImplementation(() =>
      instance(mockListSimulatorConversionRatesUseCase),
    )
    JestMockSimulateAuthorizationTransactionUseCase.mockImplementation(() =>
      instance(mockSimulateAuthorizationUseCase),
    )
    JestMockSimulateIncrementalAuthorizationTransactionUseCase.mockImplementation(
      () => instance(mockSimulateIncrementalAuthorizationUseCase),
    )
    JestMockSimulateReversalTransactionUseCase.mockImplementation(() =>
      instance(mockSimulateReversalUseCase),
    )
    JestMockSimulateAuthorizationExpiryTransactionUseCase.mockImplementation(
      () => instance(mockSimulateAuthorizationExpiryUseCase),
    )
    JestMockSimulateRefundTransactionUseCase.mockImplementation(() =>
      instance(mockSimulateRefundUseCase),
    )
    JestMockSimulateDebitTransactionUseCase.mockImplementation(() =>
      instance(mockSimulateDebitUseCase),
    )
  }

  beforeEach(() => {
    resetMocks()
    instanceUnderTest = new DefaultSudoVirtualCardsSimulatorClient({
      appSyncClient: instance(mockAppSync),
    })
  })

  describe('constructor', () => {
    beforeEach(() => {
      resetMocks()
    })
    it('constructs itself correctly', () => {
      new DefaultSudoVirtualCardsSimulatorClient({
        appSyncClient: instance(mockAppSync),
      })
      expect(JestMockDefaultSimulatorMerchantService).toHaveBeenCalledTimes(1)
      expect(JestMockDefaultSimulatorTransactionService).toHaveBeenCalledTimes(
        1,
      )
    })
  })
  describe('listSimulatorMerchants', () => {
    beforeEach(() => {
      when(mockListSimulatorMerchantsUseCase.execute(anything())).thenResolve([
        EntityDataFactory.simulatorMerchant,
      ])
    })
    it('generates use case', async () => {
      await instanceUnderTest.listSimulatorMerchants()
      expect(JestMockListSimulatorMerchantsUseCase).toHaveBeenCalledTimes(1)
    })
    it('calls use case as expected', async () => {
      await instanceUnderTest.listSimulatorMerchants()
      verify(mockListSimulatorMerchantsUseCase.execute(anything())).once()
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.listSimulatorMerchants(),
      ).resolves.toStrictEqual([ApiDataFactory.simulatorMerchant])
    })
  })
  describe('listSimulatorConversionRates', () => {
    beforeEach(() => {
      when(
        mockListSimulatorConversionRatesUseCase.execute(anything()),
      ).thenResolve([EntityDataFactory.currencyAmount])
    })
    it('generates use case', async () => {
      await instanceUnderTest.listSimulatorConversionRates()
      expect(JestMockListSimulatorConversionRatesUseCase).toHaveBeenCalledTimes(
        1,
      )
    })
    it('calls use case as expected', async () => {
      await instanceUnderTest.listSimulatorConversionRates()
      verify(mockListSimulatorConversionRatesUseCase.execute(anything())).once()
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.listSimulatorConversionRates(),
      ).resolves.toStrictEqual([ApiDataFactory.currencyAmount])
    })
  })
  describe('simulateAuthorization', () => {
    beforeEach(() => {
      when(mockSimulateAuthorizationUseCase.execute(anything())).thenResolve(
        EntityDataFactory.simulatorAuthorizeTransactionEntity,
      )
    })
    it('generates use case', async () => {
      const pan = v4()
      const amount = 10
      const merchantId = v4()
      const expiry = {
        mm: '1',
        yyyy: '1',
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
      await instanceUnderTest.simulateAuthorization({
        pan,
        amount,
        merchantId,
        expiry,
        billingAddress,
        csc,
      })
      expect(
        JestMockSimulateAuthorizationTransactionUseCase,
      ).toHaveBeenCalledTimes(1)
    })
    it('calls use case as expected', async () => {
      await instanceUnderTest.simulateAuthorization({
        pan: '',
        amount: 50,
        merchantId: '',
        expiry: { mm: '', yyyy: '' },
      })
      verify(mockSimulateAuthorizationUseCase.execute(anything())).once()
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.simulateAuthorization({
          pan: '',
          amount: 50,
          merchantId: '',
          expiry: { mm: '', yyyy: '' },
        }),
      ).resolves.toStrictEqual(ApiDataFactory.simulateAuthorizationOutput)
    })
  })
  describe('simulateIncrementalAuthorization', () => {
    beforeEach(() => {
      when(
        mockSimulateIncrementalAuthorizationUseCase.execute(anything()),
      ).thenResolve(EntityDataFactory.simulatorAuthorizeTransactionEntity)
    })
    it('generates use case', async () => {
      const authorizationId = v4()
      const amount = 10
      await instanceUnderTest.simulateIncrementalAuthorization({
        authorizationId,
        amount,
      })
      expect(
        JestMockSimulateIncrementalAuthorizationTransactionUseCase,
      ).toHaveBeenCalledTimes(1)
    })
    it('calls use case as expected', async () => {
      await instanceUnderTest.simulateIncrementalAuthorization({
        authorizationId: '',
        amount: 50,
      })
      verify(
        mockSimulateIncrementalAuthorizationUseCase.execute(anything()),
      ).once()
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.simulateIncrementalAuthorization({
          authorizationId: '',
          amount: 50,
        }),
      ).resolves.toStrictEqual(ApiDataFactory.simulateAuthorizationOutput)
    })
  })
  describe('simulateReversal', () => {
    beforeEach(() => {
      when(mockSimulateReversalUseCase.execute(anything())).thenResolve(
        EntityDataFactory.simulatorReversalTransactionEntity,
      )
    })
    it('generates use case', async () => {
      const authorizationId = v4()
      const amount = 10
      await instanceUnderTest.simulateReversal({
        authorizationId,
        amount,
      })
      expect(JestMockSimulateReversalTransactionUseCase).toHaveBeenCalledTimes(
        1,
      )
    })
    it('calls use case as expected', async () => {
      await instanceUnderTest.simulateReversal({
        authorizationId: '',
        amount: 50,
      })
      verify(mockSimulateReversalUseCase.execute(anything())).once()
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.simulateReversal({
          authorizationId: '',
          amount: 50,
        }),
      ).resolves.toStrictEqual(ApiDataFactory.simulateReversalOutput)
    })
  })
  describe('simulateAuthorizationExpiry', () => {
    beforeEach(() => {
      when(
        mockSimulateAuthorizationExpiryUseCase.execute(anything()),
      ).thenResolve(
        EntityDataFactory.simulatorAuthorizationExpiryTransactionEntity,
      )
    })
    it('generates use case', async () => {
      const authorizationId = v4()
      await instanceUnderTest.simulateAuthorizationExpiry({
        authorizationId,
      })
      expect(
        JestMockSimulateAuthorizationExpiryTransactionUseCase,
      ).toHaveBeenCalledTimes(1)
    })
    it('calls use case as expected', async () => {
      await instanceUnderTest.simulateAuthorizationExpiry({
        authorizationId: '',
      })
      verify(mockSimulateAuthorizationExpiryUseCase.execute(anything())).once()
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.simulateAuthorizationExpiry({
          authorizationId: '',
        }),
      ).resolves.toStrictEqual(ApiDataFactory.simulateAuthorizationExpiryOutput)
    })
  })
  describe('simulateRefund', () => {
    beforeEach(() => {
      when(mockSimulateRefundUseCase.execute(anything())).thenResolve(
        EntityDataFactory.simulatorRefundTransactionEntity,
      )
    })
    it('generates use case', async () => {
      const debitId = v4()
      const amount = 10
      await instanceUnderTest.simulateRefund({
        debitId,
        amount,
      })
      expect(JestMockSimulateRefundTransactionUseCase).toHaveBeenCalledTimes(1)
    })
    it('calls use case as expected', async () => {
      await instanceUnderTest.simulateRefund({
        debitId: '',
        amount: 50,
      })
      verify(mockSimulateRefundUseCase.execute(anything())).once()
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.simulateRefund({
          debitId: '',
          amount: 50,
        }),
      ).resolves.toStrictEqual(ApiDataFactory.simulateRefundOutput)
    })
  })
  describe('simulateDebit', () => {
    beforeEach(() => {
      when(mockSimulateDebitUseCase.execute(anything())).thenResolve(
        EntityDataFactory.simulatorDebitTransactionEntity,
      )
    })
    it('generates use case', async () => {
      const authorizationId = v4()
      const amount = 10
      await instanceUnderTest.simulateDebit({
        authorizationId,
        amount,
      })
      expect(JestMockSimulateDebitTransactionUseCase).toHaveBeenCalledTimes(1)
    })
    it('calls use case as expected', async () => {
      await instanceUnderTest.simulateDebit({
        authorizationId: '',
        amount: 50,
      })
      verify(mockSimulateDebitUseCase.execute(anything())).once()
    })
    it('returns expected result', async () => {
      await expect(
        instanceUnderTest.simulateDebit({
          authorizationId: '',
          amount: 50,
        }),
      ).resolves.toStrictEqual(ApiDataFactory.simulateDebitOutput)
    })
  })
})
