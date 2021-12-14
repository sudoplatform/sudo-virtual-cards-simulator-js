import { CachePolicy } from '@sudoplatform/sudo-common'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import AWSAppSyncClient from 'aws-appsync'
import { ApiClient } from '../private/data/common/apiClient'
import { DefaultSimulatorMerchantService } from '../private/data/simulatorMerchant/defaultSimulatorMerchantService'
import { DefaultSimulatorTransactionService } from '../private/data/simulatorTransaction/defaultSimulatorTransactionService'
import { SimulatorMerchantService } from '../private/domain/entities/simulatorMerchant/simulatorMerchantService'
import { SimulatorTransactionService } from '../private/domain/entities/simulatorTransaction/simulatorTransactionService'
import { ListSimulatorMerchantsUseCase } from '../private/domain/use-cases/simulatorMerchant/listSimulatorMerchantsUseCase'
import { SimulateAuthorizationExpiryTransactionUseCase } from '../private/domain/use-cases/simulatorTransaction/simulateAuthorizationExpiryTransactionUseCase'
import { SimulateAuthorizationTransactionUseCase } from '../private/domain/use-cases/simulatorTransaction/simulateAuthorizationTransactionUseCase'
import { SimulateDebitTransactionUseCase } from '../private/domain/use-cases/simulatorTransaction/simulateDebitTransactionUseCase'
import { SimulateIncrementalAuthorizationTransactionUseCase } from '../private/domain/use-cases/simulatorTransaction/simulateIncrementalAuthorizationTransactionUseCase'
import { SimulateRefundTransactionUseCase } from '../private/domain/use-cases/simulatorTransaction/simulateRefundTransactionUseCase'
import { SimulateReversalTransactionUseCase } from '../private/domain/use-cases/simulatorTransaction/simulateReversalTransactionUseCase'
import { SimulatorMerchant } from './typings'
import { CurrencyAmount } from './typings/currencyAmount'

/**
 * Input for {@link SudoVirtualCardsSimulatorClient.listSimulatorMerchants}.
 * @property {CachePolicy | undefined} cachePolicy Optional - cache policy for listing merchants. If not supplied, remote will be used.
 */
export interface ListSimulatorMerchantsInput {
  cachePolicy?: CachePolicy
}

/**
 * Input for expiry.
 * @property {string} mm Month in format MM.
 * @property {string} yyyy Year in format YYYY.
 */
export interface ExpiryInput {
  mm: string
  yyyy: string
}

/**
 * Input of BillingAddress data structure for depicting a card/funding source billing address.
 * @property {string} addressLine1 First line of the address.
 * @property {string | undefined} addressLine2 Second line of the address.
 * @property {string} city City of the address.
 * @property {string} state State of the address.
 * @property {string} postalCode Postal code of the address.
 * @property {string} country Country of the address.
 */
export interface SimulateAuthorizationBillingAddressInput {
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

/**
 * Input for {@link SudoVirtualCardsSimulatorClient.simulateAuthorization}.
 * @property {string} pan Card number presented to merchant.
 * @property {number} amount Amount of transaction in merchant's minor currency (e.g. cents for USD).
 * @property {string} merchantId ID of merchant to use in simulated authorization.
 * @property {ExpiryInput} expiry Simulation of card expiry entered by user at merchant checkout.
 * @property {SimulateAuthorizationBillingAddressInput} billingAddress Simulation of billing address entered by user at merchant checkout. If absent, will be treated as a `NOT_PROVIDED` on the simulation for AVS check.
 * @property {string} csc Simulation of card security code entered by user at merchant checkout. If absent, will be treated as a `NOT_PROVIDED` on the simulation for the CSC check.
 */
export interface SimulateAuthorizationInput {
  pan: string
  amount: number
  merchantId: string
  expiry: ExpiryInput
  billingAddress?: SimulateAuthorizationBillingAddressInput
  csc?: string
}

/**
 * Output for {@link SudoVirtualCardsSimulatorClient.simulateAuthorization}.
 * @property {string} id ID of authorization response. If approved, ID may be used in subsequent incremental authorizations, reversals and debits.
 * @property {boolean} approved Whether or not authorization is approved.
 * @property {CurrencyAmount} billedAmount Amount billed in card's currency.
 * @property {string | undefined} declineReason Decline reason code. Only present if not approved.
 * @property {Date} createdAt Date/timestamp response was created at.
 * @property {Date} updatedAt Date/timestamp response was last updated at.
 */
export interface SimulateAuthorizationOutput {
  id: string
  approved: boolean
  billedAmount: CurrencyAmount
  billed: CurrencyAmount
  declineReason?: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Input for {@link SudoVirtualCardsSimulatorClient.simulateIncrementalAuthorization}.
 * @property {number} amount Amount of transaction in merchant's currency.
 * @property {string} authorizationId ID of previous successful authorization to which this incremental authorization corresponds.
 */
export interface SimulateIncrementalAuthorizationInput {
  amount: number
  authorizationId: string
}

/**
 * Output for {@link SudoVirtualCardsSimulatorClient.simulateIncrementalAuthorization}.
 * @property {string} id ID of authorization response. If approved, ID may be used in subsequent incremental authorizations, reversals and debits.
 * @property {boolean} approved Whether or not authorization is approved.
 * @property {CurrencyAMount} billedAmount Amount billed in card's currency.
 * @property {string | undefined} declineReason Decline reason code. Only present if not approved.
 * @property {Date} createdAt Date/timestamp response was created at.
 * @property {Date} updatedAt Date/timestamp response was last updated at.
 */
export interface SimulateIncrementalAuthorizationOutput {
  id: string
  approved: boolean
  billedAmount: CurrencyAmount
  declineReason?: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Input for {@link SudoVirtualCardsSimulatorClient.simulateReversal}.
 * @property {number} amount Amount of reversal in merchant's currency.
 * @property {string} authorizationId ID of previous successful authorization to which this reversal corresponds.
 */
export interface SimulateReversalInput {
  amount: number
  authorizationId: string
}

/**
 * Output for {@link SudoVirtualCardsSimulatorClient.simulateReversal}.
 * @property {string} id ID of reversal response.
 * @property {CurrencyAmount} billedAmount Amount billed in card's currency.
 * @property {Date} createdAt Date/timestamp response was created at.
 * @property {Date} updatedAt Date/timestamp response was last updated at.
 */
export interface SimulateReversalOutput {
  id: string
  billedAmount: CurrencyAmount
  createdAt: Date
  updatedAt: Date
}

/**
 * Input for {@link SudoVirtualCardsSimulatorClient.simulateAuthorizationExpiry}.
 * @property {string} authorizationId ID of previous successful authorization to which this expiration corresponds.
 */
export interface SimulateAuthorizationExpiryInput {
  authorizationId: string
}

/**
 * Output for {@link SudoVirtualCardsSimulatorClient.simulateAuthorizationExpiry}.
 * @property {string} id ID of expiry response.
 * @property {Date} createdAt Date/timestamp response was created at.
 * @property {Date} updatedAt Date/timestamp response was last updated at.
 */
export interface SimulateAuthorizationExpiryOutput {
  id: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Input for {@link SudoVirtualCardsSimulatorClient.simulateRefund}.
 * @property {number} amount Amount of refund in merchant's currency.
 * @property {string} debitId ID of previous successful debit to which this refund corresponds.
 */
export interface SimulateRefundInput {
  amount: number
  debitId: string
}

/**
 * Output for {@link SudoVirtualCardsSimulatorClient.simulateRefund}.
 * @property {string} id ID of refund response.
 * @property {CurrencyAmount} billedAmount Amount billed in card's currency.
 * @property {Date} createdAt Date/timestamp response was created at.
 * @property {Date} updatedAt Date/timestamp response was last updated at.
 */
export interface SimulateRefundOutput {
  id: string
  billedAmount: CurrencyAmount
  createdAt: Date
  updatedAt: Date
}

/**
 * Input for {@link SudoVirtualCardsSimulatorClient.simulateDebit}.
 * @property {number} amount Amount of debit in merchant's currency.
 * @property {string} debitId ID of previous successful debit to which this refund corresponds.
 */
export interface SimulateDebitInput {
  amount: number
  authorizationId: string
}

/**
 * Output for {@link SudoVirtualCardsSimulatorClient.simulateDebit}.
 * @property {string} id ID of debit response.
 * @property {CurrencyAmount} billedAmount Amount billed in card's currency.
 * @property {Date} createdAt Date/timestamp response was created at.
 * @property {Date} updatedAt Date/timestamp response was last updated at.
 */
export interface SimulateDebitOutput {
  id: string
  billedAmount: CurrencyAmount
  createdAt: Date
  updatedAt: Date
}

/**
 * Client used to interface with the virtual cards service simulator.
 *
 * This client allows you to simulate the use of a virtual card at merchants to generate transaction events. The simulator is only available in sandbox
 * environments.
 *
 * It is recommended to code to this interface, rather than the implementation class (`DefaultSudoVirtualCardsSimulatorClient`) as the implementation class is
 * only meant to be used for initializing an instance of the client.
 */
export interface SudoVirtualCardsSimulatorClient {
  /**
   * Retrieve a list of supported simulated merchants.
   *
   * This method returns all the supported merchants available to perform transaction simulations.
   *
   * @param {ListSimulatorMerchantsInput} input Input parameters.
   */
  listSimulatorMerchants(
    input?: ListSimulatorMerchantsInput,
  ): Promise<SimulatorMerchant[]>

  /**
   * Simulate an authorization transaction (`pending`).
   *
   * This causes a pending transaction to appear on the card with the passed in `id`.
   *
   * @param {SimulateAuthorizationInput} input Input parameters.
   */
  simulateAuthorization(
    input: SimulateAuthorizationInput,
  ): Promise<SimulateAuthorizationOutput>

  /**
   *
   * Simulate an incremental authorization transaction (`.pending`).
   *
   * This will increment an authorization transaction to increase its amount.
   *
   * @param {SimulateIncrementalAuthorizationInput} input Input parameters.
   */
  simulateIncrementalAuthorization(
    input: SimulateIncrementalAuthorizationInput,
  ): Promise<SimulateIncrementalAuthorizationOutput>

  /**
   * Simulate an authorization reversal transaction.
   *
   * Reversals do not generate a transaction the user can see, but will instead reverse an existing authorization (`.pending`) transaction. A reversal can
   * be partial, which will cause the authorization transaction to be decremented by the input amount, or can be reversed the entire amount. If the entire
   * amount is reversed, the authorization transaction record will be deleted.
   *
   * Reversals cannot exceed the total of the authorization, otherwise an error will be returned and no operation will be performed.
   *
   * @param {SimulateReversalInput} input Input parameters.
   */
  simulateReversal(
    input: SimulateReversalInput,
  ): Promise<SimulateReversalOutput>

  /**
   * Simulate expiry of a pending authorization expiry (`.pending`).
   *
   * This causes a pending transaction to expire as if reversed.
   *
   * @param {SimulateAuthorizationExpiryInput} input Input parameters.
   */
  simulateAuthorizationExpiry(
    input: SimulateAuthorizationExpiryInput,
  ): Promise<SimulateAuthorizationExpiryOutput>

  /**
   * Simulate a refund transaction (`refund`).
   *
   * Simulating a refund will generate a refund transaction. Simulating a refund does not mutate any existing records, and instead generates a new refund
   * transaction.
   *
   * Refunds can only be performed against a transaction that has already been previously debited (`.complete`). Debits can also be partially refunded, which
   * will generate a new refund transaction record of the partially refunded amount.
   *
   * Refunds cannot exceed the total amount of a debit, otherwise an error will be returned and no operation will be performed.
   *
   * @param {SimulateRefundInput} input Input parameters.
   */
  simulateRefund(input: SimulateRefundInput): Promise<SimulateRefundOutput>

  /**
   *
   * Simulate a debit transaction (`complete`).
   *
   * Simulating a debit will generate a `.complete` transaction. Simulating a debit does not mutate any existing records, and instead generates a new debit
   * transaction.
   *
   * Debits can only be performed against a transaction that has already been previously authorized (`.pending`). Authorizations can also be partially
   * debited, which will generate a debit record of the partially debited amount.
   *
   * Debits **can** exceed the total amount of a authorization.
   *
   * @param {SimulateDebitInput} input Input parameters.
   */
  simulateDebit(input: SimulateDebitInput): Promise<SimulateDebitOutput>
}

export interface SudoVirtualCardsSimulatorClientOptions {
  appSyncClient: AWSAppSyncClient<NormalizedCacheObject>
}

export class DefaultSudoVirtualCardsSimulatorClient
  implements SudoVirtualCardsSimulatorClient
{
  private readonly apiClient: ApiClient

  private readonly simulatorMerchantService: SimulatorMerchantService
  private readonly simulatorTransactionService: SimulatorTransactionService

  constructor(opts: SudoVirtualCardsSimulatorClientOptions) {
    this.apiClient = new ApiClient(opts.appSyncClient)
    this.simulatorMerchantService = new DefaultSimulatorMerchantService(
      this.apiClient,
    )
    this.simulatorTransactionService = new DefaultSimulatorTransactionService(
      this.apiClient,
    )
  }

  async listSimulatorMerchants(
    input?: ListSimulatorMerchantsInput,
  ): Promise<SimulatorMerchant[]> {
    const useCase = new ListSimulatorMerchantsUseCase(
      this.simulatorMerchantService,
    )
    return await useCase.execute(input)
  }

  async simulateAuthorization(
    input: SimulateAuthorizationInput,
  ): Promise<SimulateAuthorizationOutput> {
    const useCase = new SimulateAuthorizationTransactionUseCase(
      this.simulatorTransactionService,
    )
    return await useCase.execute(input)
  }

  async simulateIncrementalAuthorization(
    input: SimulateIncrementalAuthorizationInput,
  ): Promise<SimulateIncrementalAuthorizationOutput> {
    const useCase = new SimulateIncrementalAuthorizationTransactionUseCase(
      this.simulatorTransactionService,
    )
    return await useCase.execute(input)
  }

  async simulateReversal(
    input: SimulateReversalInput,
  ): Promise<SimulateReversalOutput> {
    const useCase = new SimulateReversalTransactionUseCase(
      this.simulatorTransactionService,
    )
    return await useCase.execute(input)
  }

  async simulateAuthorizationExpiry(
    input: SimulateAuthorizationExpiryInput,
  ): Promise<SimulateAuthorizationExpiryOutput> {
    const useCase = new SimulateAuthorizationExpiryTransactionUseCase(
      this.simulatorTransactionService,
    )
    return await useCase.execute(input)
  }

  async simulateRefund(
    input: SimulateRefundInput,
  ): Promise<SimulateRefundOutput> {
    const useCase = new SimulateRefundTransactionUseCase(
      this.simulatorTransactionService,
    )
    return await useCase.execute(input)
  }

  async simulateDebit(input: SimulateDebitInput): Promise<SimulateDebitOutput> {
    const useCase = new SimulateDebitTransactionUseCase(
      this.simulatorTransactionService,
    )
    return await useCase.execute(input)
  }
}
