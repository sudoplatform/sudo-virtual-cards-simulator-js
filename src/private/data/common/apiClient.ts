/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AppSyncError,
  DefaultLogger,
  FatalError,
  UnknownGraphQLError,
} from '@sudoplatform/sudo-common'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { OperationVariables } from 'apollo-client/core/types'
import {
  FetchPolicy,
  MutationOptions,
  QueryOptions,
} from 'apollo-client/core/watchQueryOptions'
import { ApolloError } from 'apollo-client/errors/ApolloError'
import AWSAppSyncClient from 'aws-appsync'
import {
  CurrencyAmount,
  ListSimulatorConversionRatesDocument,
  ListSimulatorConversionRatesQuery,
  ListSimulatorMerchantsDocument,
  ListSimulatorMerchantsQuery,
  SimulateAuthorizationDocument,
  SimulateAuthorizationExpiryDocument,
  SimulateAuthorizationExpiryMutation,
  SimulateAuthorizationExpiryRequest,
  SimulateAuthorizationExpiryResponse,
  SimulateAuthorizationMutation,
  SimulateAuthorizationRequest,
  SimulateAuthorizationResponse,
  SimulateDebitDocument,
  SimulateDebitMutation,
  SimulateDebitRequest,
  SimulateDebitResponse,
  SimulateIncrementalAuthorizationDocument,
  SimulateIncrementalAuthorizationMutation,
  SimulateIncrementalAuthorizationRequest,
  SimulateRefundDocument,
  SimulateRefundMutation,
  SimulateRefundRequest,
  SimulateRefundResponse,
  SimulateReversalDocument,
  SimulateReversalMutation,
  SimulateReversalRequest,
  SimulateReversalResponse,
  SimulatorMerchant,
} from '../../../gen/graphqlTypes'
import { ErrorTransformer } from './transformer/errorTransformer'

export class ApiClient {
  private readonly log: DefaultLogger
  private readonly client: AWSAppSyncClient<NormalizedCacheObject>

  public constructor(apiClient: AWSAppSyncClient<NormalizedCacheObject>) {
    this.client = apiClient
    this.log = new DefaultLogger(this.constructor.name)
  }

  async simulateAuthorization(
    input: SimulateAuthorizationRequest,
  ): Promise<SimulateAuthorizationResponse> {
    const data = await this.performMutation<SimulateAuthorizationMutation>({
      mutation: SimulateAuthorizationDocument,
      variables: { input },
      calleeName: this.simulateAuthorization.name,
    })
    return data.simulateAuthorization
  }
  async simulateIncrementalAuthorization(
    input: SimulateIncrementalAuthorizationRequest,
  ): Promise<SimulateAuthorizationResponse> {
    const data =
      await this.performMutation<SimulateIncrementalAuthorizationMutation>({
        mutation: SimulateIncrementalAuthorizationDocument,
        variables: { input },
        calleeName: this.simulateIncrementalAuthorization.name,
      })
    return data.simulateIncrementalAuthorization
  }

  async simulateAuthorizationExpiry(
    input: SimulateAuthorizationExpiryRequest,
  ): Promise<SimulateAuthorizationExpiryResponse> {
    const data =
      await this.performMutation<SimulateAuthorizationExpiryMutation>({
        mutation: SimulateAuthorizationExpiryDocument,
        variables: { input },
        calleeName: this.simulateAuthorizationExpiry.name,
      })
    return data.simulateAuthorizationExpiry
  }

  async simulateRefund(
    input: SimulateRefundRequest,
  ): Promise<SimulateRefundResponse> {
    const data = await this.performMutation<SimulateRefundMutation>({
      mutation: SimulateRefundDocument,
      variables: { input },
      calleeName: this.simulateRefund.name,
    })
    return data.simulateRefund
  }

  async simulateDebit(
    input: SimulateDebitRequest,
  ): Promise<SimulateDebitResponse> {
    const data = await this.performMutation<SimulateDebitMutation>({
      mutation: SimulateDebitDocument,
      variables: { input },
      calleeName: this.simulateDebit.name,
    })
    return data.simulateDebit
  }

  async listSimulatorMerchants(
    fetchPolicy: FetchPolicy,
  ): Promise<SimulatorMerchant[]> {
    const data = await this.performQuery<ListSimulatorMerchantsQuery>({
      query: ListSimulatorMerchantsDocument,
      fetchPolicy,
      calleeName: this.listSimulatorMerchants.name,
    })
    return data.listSimulatorMerchants
  }

  async listSimulatorConversionRates(
    fetchPolicy: FetchPolicy,
  ): Promise<CurrencyAmount[]> {
    const data = await this.performQuery<ListSimulatorConversionRatesQuery>({
      query: ListSimulatorConversionRatesDocument,
      fetchPolicy,
      calleeName: this.listSimulatorConversionRates.name,
    })
    return data.listSimulatorConversionRates
  }

  async simulateReversal(
    input: SimulateReversalRequest,
  ): Promise<SimulateReversalResponse> {
    const data = await this.performMutation<SimulateReversalMutation>({
      mutation: SimulateReversalDocument,
      variables: { input },
      calleeName: this.simulateReversal.name,
    })
    return data.simulateReversal
  }

  async performQuery<Q>({
    variables,
    fetchPolicy,
    query,
    calleeName,
  }: QueryOptions<OperationVariables> & { calleeName?: string }): Promise<Q> {
    let result
    try {
      result = await this.client.query<Q>({
        variables,
        fetchPolicy,
        query,
      })
    } catch (err: any) {
      const clientError = err as ApolloError
      this.log.debug('error received', { calleeName, clientError })
      const error = clientError.graphQLErrors?.[0]
      if (error) {
        this.log.debug('appSync query failed with error', { error })
        throw ErrorTransformer.toClientError(error)
      } else {
        throw new UnknownGraphQLError(err)
      }
    }
    const error = result.errors?.[0]
    if (error) {
      this.log.debug('error received', { error })
      throw ErrorTransformer.toClientError(error)
    }
    if (result.data) {
      return result.data
    } else {
      throw new FatalError(
        `${calleeName ?? '<no callee>'} did not return any result`,
      )
    }
  }

  async performMutation<M>({
    mutation,
    variables,
    calleeName,
  }: Omit<MutationOptions<M>, 'fetchPolicy'> & {
    calleeName?: string
  }): Promise<M> {
    let result
    try {
      result = await this.client.mutate<M>({
        mutation,
        variables,
      })
    } catch (err) {
      const clientError = err as ApolloError
      this.log.debug('error received', { calleeName, clientError })
      const error = clientError.graphQLErrors?.[0]
      if (error) {
        this.log.debug('appSync mutation failed with error', { error })
        throw ErrorTransformer.toClientError(error)
      } else {
        throw new UnknownGraphQLError(err as AppSyncError)
      }
    }
    const error = result.errors?.[0]
    if (error) {
      this.log.debug('appSync mutation failed with error', { error })
      throw ErrorTransformer.toClientError(error)
    }
    if (result.data) {
      return result.data
    } else {
      throw new FatalError(
        `${calleeName ?? '<no callee>'} did not return any result`,
      )
    }
  }
}
