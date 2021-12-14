import { BillingAddressEntity } from '../common/billingAddressEntity'
import { ExpiryEntity } from '../common/expiryEntity'
import { SimulatorReversalTransactionEntity } from './simulateReversalTransactionEntity'
import { SimulatorAuthorizationExpiryTransactionEntity } from './simulatorAuthorizationExpiryTransactionEntity'
import { SimulatorAuthorizeTransactionEntity } from './simulatorAuthorizeTransactionEntity'
import { SimulatorDebitTransactionEntity } from './simulatorDebitTransactionEntity'
import { SimulatorRefundTransactionEntity } from './simulatorRefundTransactionEntity'

export interface SimulatorTransactionServiceAuthorizeInput {
  pan: string
  amount: number
  merchantId: string
  expiry: ExpiryEntity
  billingAddress?: BillingAddressEntity
  csc?: string
}

export interface SimulatorTransactionServiceIncrementalAuthorizeInput {
  amount: number
  authorizationId: string
}

export interface SimulatorTransactionServiceReverseInput {
  amount: number
  authorizationId: string
}

export interface SimulatorTransactionServiceExpireAuthorizationInput {
  authorizationId: string
}

export interface SimulatorTransactionServiceRefundInput {
  amount: number
  debitId: string
}

export interface SimulatorTransactionServiceDebitInput {
  amount: number
  authorizationId: string
}

export interface SimulatorTransactionService {
  authorize(
    input: SimulatorTransactionServiceAuthorizeInput,
  ): Promise<SimulatorAuthorizeTransactionEntity>
  incrementalAuthorize(
    input: SimulatorTransactionServiceIncrementalAuthorizeInput,
  ): Promise<SimulatorAuthorizeTransactionEntity>
  reverse(
    input: SimulatorTransactionServiceReverseInput,
  ): Promise<SimulatorReversalTransactionEntity>
  expireAuthorization(
    input: SimulatorTransactionServiceExpireAuthorizationInput,
  ): Promise<SimulatorAuthorizationExpiryTransactionEntity>
  refund(
    input: SimulatorTransactionServiceRefundInput,
  ): Promise<SimulatorRefundTransactionEntity>
  debit(
    input: SimulatorTransactionServiceDebitInput,
  ): Promise<SimulatorDebitTransactionEntity>
}
