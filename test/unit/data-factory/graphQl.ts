import {
  CurrencyAmount,
  SimulateAuthorizationExpiryResponse,
  SimulateAuthorizationResponse,
  SimulateDebitResponse,
  SimulateRefundResponse,
  SimulateReversalResponse,
  SimulatorMerchant,
} from '../../../src/gen/graphqlTypes'

export class GraphQLDataFactory {
  private static readonly commonProps = {
    id: 'dummyId',
    createdAtEpochMs: 1.0,
    updatedAtEpochMs: 2.0,
  }

  static readonly simulatorMerchant: SimulatorMerchant = {
    ...GraphQLDataFactory.commonProps,
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

  static readonly simulateAuthorizationResponse: SimulateAuthorizationResponse =
    {
      ...this.commonProps,
      approved: true,
      authorizationCode: 'dummyAuthorizationCode',
      billed: GraphQLDataFactory.currencyAmount,
      billedAmount: GraphQLDataFactory.currencyAmount,
      declineReason: 'dummyDeclineReason',
    }

  static readonly simulateReversalResponse: SimulateReversalResponse = {
    ...this.commonProps,
    billedAmount: GraphQLDataFactory.currencyAmount,
  }

  static readonly simulateAuthorizationExpiryResponse: SimulateAuthorizationExpiryResponse =
    {
      ...this.commonProps,
    }

  static readonly simulateRefundResponse: SimulateRefundResponse = {
    ...this.commonProps,
    billedAmount: GraphQLDataFactory.currencyAmount,
  }

  static readonly simulateDebitResponse: SimulateDebitResponse = {
    ...this.commonProps,
    billedAmount: GraphQLDataFactory.currencyAmount,
  }
}
