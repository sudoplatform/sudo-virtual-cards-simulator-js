import { CachePolicy, UnknownGraphQLError } from '@sudoplatform/sudo-common'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { NetworkStatus } from 'apollo-client/core/networkStatus'
import { ApolloError } from 'apollo-client/errors/ApolloError'
import AWSAppSyncClient from 'aws-appsync'
import { GraphQLError } from 'graphql'
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
import {
  ListSimulatorMerchantsDocument,
  SimulateAuthorizationDocument,
  SimulateAuthorizationExpiryDocument,
  SimulateDebitDocument,
  SimulateIncrementalAuthorizationDocument,
  SimulateRefundDocument,
  SimulateReversalDocument,
} from '../../../../../src/gen/graphqlTypes'
import { ApiClient } from '../../../../../src/private/data/common/apiClient'
import { GraphQLDataFactory } from '../../../data-factory/graphQl'

describe('ApiClient Test Suite', () => {
  let instanceUnderTest: ApiClient
  const mockClient = mock<AWSAppSyncClient<NormalizedCacheObject>>()

  beforeEach(() => {
    reset(mockClient)
    instanceUnderTest = new ApiClient(instance(mockClient))
  })

  describe('simulateAuthorization', () => {
    it('performs successfully', async () => {
      when(mockClient.mutate(anything())).thenResolve({
        data: {
          simulateAuthorization:
            GraphQLDataFactory.simulateAuthorizationResponse,
        },
      } as any)
      const amount = 100
      const billingAddress = {
        addressLine1: v4(),
        addressLine2: v4(),
        city: v4(),
        country: v4(),
        postalCode: v4(),
        state: v4(),
      }
      const csc = v4()
      const expiry = {
        mm: 1,
        yyyy: 2022,
      }
      const merchantId = v4()
      const pan = v4()

      await expect(
        instanceUnderTest.simulateAuthorization({
          amount,
          billingAddress,
          csc,
          expiry,
          merchantId,
          pan,
        }),
      ).resolves.toStrictEqual(GraphQLDataFactory.simulateAuthorizationResponse)
      verify(mockClient.mutate(anything())).once()
      const [args] = capture(mockClient.mutate as any).first()
      expect(args).toStrictEqual({
        mutation: SimulateAuthorizationDocument,
        variables: {
          input: {
            amount,
            billingAddress,
            csc,
            expiry,
            merchantId,
            pan,
          },
        },
      })
    })
    it('handles thrown error from app sync call', async () => {
      when(mockClient.mutate(anything())).thenReject(
        new ApolloError({
          graphQLErrors: [new GraphQLError('appsync failure')],
        }),
      )
      await expect(
        instanceUnderTest.simulateAuthorization({
          amount: 50,
          expiry: {
            mm: 1,
            yyyy: 2,
          },
          merchantId: '',
          pan: '',
        }),
      ).rejects.toThrow(UnknownGraphQLError)
    })
    it('handles error from graphQl', async () => {
      when(mockClient.mutate(anything())).thenResolve({
        errors: [new GraphQLError('failed')],
      })
      await expect(
        instanceUnderTest.simulateAuthorization({
          amount: 50,
          expiry: {
            mm: 1,
            yyyy: 2,
          },
          merchantId: '',
          pan: '',
        }),
      ).rejects.toThrow(UnknownGraphQLError)
    })
    describe('simulateIncrementalAuthorization', () => {
      it('performs successfully', async () => {
        when(mockClient.mutate(anything())).thenResolve({
          data: {
            simulateIncrementalAuthorization:
              GraphQLDataFactory.simulateAuthorizationResponse,
          },
        } as any)
        const amount = 100
        const authorizationId = v4()
        await expect(
          instanceUnderTest.simulateIncrementalAuthorization({
            amount,
            authorizationId,
          }),
        ).resolves.toStrictEqual(
          GraphQLDataFactory.simulateAuthorizationResponse,
        )
        verify(mockClient.mutate(anything())).once()
        const [args] = capture(mockClient.mutate as any).first()
        expect(args).toStrictEqual({
          mutation: SimulateIncrementalAuthorizationDocument,
          variables: {
            input: {
              amount,
              authorizationId,
            },
          },
        })
      })
      it('handles thrown error from app sync call', async () => {
        when(mockClient.mutate(anything())).thenReject(
          new ApolloError({
            graphQLErrors: [new GraphQLError('appsync failure')],
          }),
        )
        await expect(
          instanceUnderTest.simulateIncrementalAuthorization({
            amount: 50,
            authorizationId: '',
          }),
        ).rejects.toThrow(UnknownGraphQLError)
      })
      it('handles error from graphQl', async () => {
        when(mockClient.mutate(anything())).thenResolve({
          errors: [new GraphQLError('failed')],
        })
        await expect(
          instanceUnderTest.simulateIncrementalAuthorization({
            amount: 50,
            authorizationId: '',
          }),
        ).rejects.toThrow(UnknownGraphQLError)
      })
    })
  })
  describe('simulateReversal', () => {
    it('performs successfully', async () => {
      when(mockClient.mutate(anything())).thenResolve({
        data: {
          simulateReversal: GraphQLDataFactory.simulateReversalResponse,
        },
      } as any)
      const amount = 100
      const authorizationId = v4()

      await expect(
        instanceUnderTest.simulateReversal({
          amount,
          authorizationId,
        }),
      ).resolves.toStrictEqual(GraphQLDataFactory.simulateReversalResponse)
      verify(mockClient.mutate(anything())).once()
      const [args] = capture(mockClient.mutate as any).first()
      expect(args).toStrictEqual({
        mutation: SimulateReversalDocument,
        variables: {
          input: {
            amount,
            authorizationId,
          },
        },
      })
    })
    it('handles thrown error from app sync call', async () => {
      when(mockClient.mutate(anything())).thenReject(
        new ApolloError({
          graphQLErrors: [new GraphQLError('appsync failure')],
        }),
      )
      await expect(
        instanceUnderTest.simulateReversal({
          amount: 50,
          authorizationId: '',
        }),
      ).rejects.toThrow(UnknownGraphQLError)
    })
    it('handles error from graphQl', async () => {
      when(mockClient.mutate(anything())).thenResolve({
        errors: [new GraphQLError('failed')],
      })
      await expect(
        instanceUnderTest.simulateReversal({
          amount: 50,
          authorizationId: '',
        }),
      ).rejects.toThrow(UnknownGraphQLError)
    })
    describe('simulateIncrementalAuthorization', () => {
      it('performs successfully', async () => {
        when(mockClient.mutate(anything())).thenResolve({
          data: {
            simulateIncrementalAuthorization:
              GraphQLDataFactory.simulateReversalResponse,
          },
        } as any)
        const amount = 100
        const authorizationId = v4()
        await expect(
          instanceUnderTest.simulateIncrementalAuthorization({
            amount,
            authorizationId,
          }),
        ).resolves.toStrictEqual(GraphQLDataFactory.simulateReversalResponse)
        verify(mockClient.mutate(anything())).once()
        const [args] = capture(mockClient.mutate as any).first()
        expect(args).toStrictEqual({
          mutation: SimulateIncrementalAuthorizationDocument,
          variables: {
            input: {
              amount,
              authorizationId,
            },
          },
        })
      })
      it('handles thrown error from app sync call', async () => {
        when(mockClient.mutate(anything())).thenReject(
          new ApolloError({
            graphQLErrors: [new GraphQLError('appsync failure')],
          }),
        )
        await expect(
          instanceUnderTest.simulateIncrementalAuthorization({
            amount: 50,
            authorizationId: '',
          }),
        ).rejects.toThrow(UnknownGraphQLError)
      })
      it('handles error from graphQl', async () => {
        when(mockClient.mutate(anything())).thenResolve({
          errors: [new GraphQLError('failed')],
        })
        await expect(
          instanceUnderTest.simulateIncrementalAuthorization({
            amount: 50,
            authorizationId: '',
          }),
        ).rejects.toThrow(UnknownGraphQLError)
      })
    })
  })

  describe('simulateAuthorizationExpiry', () => {
    it('performs successfully', async () => {
      when(mockClient.mutate(anything())).thenResolve({
        data: {
          simulateAuthorizationExpiry:
            GraphQLDataFactory.simulateAuthorizationExpiryResponse,
        },
      } as any)
      const authorizationId = v4()
      await expect(
        instanceUnderTest.simulateAuthorizationExpiry({
          authorizationId,
        }),
      ).resolves.toStrictEqual(
        GraphQLDataFactory.simulateAuthorizationExpiryResponse,
      )
      verify(mockClient.mutate(anything())).once()
      const [args] = capture(mockClient.mutate as any).first()
      expect(args).toStrictEqual({
        mutation: SimulateAuthorizationExpiryDocument,
        variables: {
          input: {
            authorizationId,
          },
        },
      })
    })
    it('handles thrown error from app sync call', async () => {
      when(mockClient.mutate(anything())).thenReject(
        new ApolloError({
          graphQLErrors: [new GraphQLError('appsync failure')],
        }),
      )
      await expect(
        instanceUnderTest.simulateAuthorizationExpiry({
          authorizationId: '',
        }),
      ).rejects.toThrow(UnknownGraphQLError)
    })
    it('handles error from graphQl', async () => {
      when(mockClient.mutate(anything())).thenResolve({
        errors: [new GraphQLError('failed')],
      })
      await expect(
        instanceUnderTest.simulateAuthorizationExpiry({
          authorizationId: '',
        }),
      ).rejects.toThrow(UnknownGraphQLError)
    })
  })

  describe('simulateRefund', () => {
    it('performs successfully', async () => {
      when(mockClient.mutate(anything())).thenResolve({
        data: {
          simulateRefund: GraphQLDataFactory.simulateRefundResponse,
        },
      } as any)
      const debitId = v4()
      const amount = 50
      await expect(
        instanceUnderTest.simulateRefund({
          debitId,
          amount,
        }),
      ).resolves.toStrictEqual(GraphQLDataFactory.simulateRefundResponse)
      verify(mockClient.mutate(anything())).once()
      const [args] = capture(mockClient.mutate as any).first()
      expect(args).toStrictEqual({
        mutation: SimulateRefundDocument,
        variables: {
          input: {
            debitId,
            amount,
          },
        },
      })
    })
    it('handles thrown error from app sync call', async () => {
      when(mockClient.mutate(anything())).thenReject(
        new ApolloError({
          graphQLErrors: [new GraphQLError('appsync failure')],
        }),
      )
      await expect(
        instanceUnderTest.simulateRefund({
          debitId: '',
          amount: 50,
        }),
      ).rejects.toThrow(UnknownGraphQLError)
    })
    it('handles error from graphQl', async () => {
      when(mockClient.mutate(anything())).thenResolve({
        errors: [new GraphQLError('failed')],
      })
      await expect(
        instanceUnderTest.simulateRefund({
          debitId: '',
          amount: 50,
        }),
      ).rejects.toThrow(UnknownGraphQLError)
    })
  })

  describe('simulateDebit', () => {
    it('performs successfully', async () => {
      when(mockClient.mutate(anything())).thenResolve({
        data: {
          simulateDebit: GraphQLDataFactory.simulateDebitResponse,
        },
      } as any)
      const authorizationId = v4()
      const amount = 50
      await expect(
        instanceUnderTest.simulateDebit({
          authorizationId,
          amount,
        }),
      ).resolves.toStrictEqual(GraphQLDataFactory.simulateDebitResponse)
      verify(mockClient.mutate(anything())).once()
      const [args] = capture(mockClient.mutate as any).first()
      expect(args).toStrictEqual({
        mutation: SimulateDebitDocument,
        variables: {
          input: {
            authorizationId,
            amount,
          },
        },
      })
    })
    it('handles thrown error from app sync call', async () => {
      when(mockClient.mutate(anything())).thenReject(
        new ApolloError({
          graphQLErrors: [new GraphQLError('appsync failure')],
        }),
      )
      await expect(
        instanceUnderTest.simulateDebit({
          authorizationId: '',
          amount: 50,
        }),
      ).rejects.toThrow(UnknownGraphQLError)
    })
    it('handles error from graphQl', async () => {
      when(mockClient.mutate(anything())).thenResolve({
        errors: [new GraphQLError('failed')],
      })
      await expect(
        instanceUnderTest.simulateDebit({
          authorizationId: '',
          amount: 50,
        }),
      ).rejects.toThrow(UnknownGraphQLError)
    })
  })

  describe('listSimulatorMerchants', () => {
    it('performs successfully', async () => {
      when(mockClient.query(anything())).thenResolve({
        data: {
          listSimulatorMerchants: [GraphQLDataFactory.simulatorMerchant],
        },
      } as any)
      const fetchPolicy = 'cache-only'
      await expect(
        instanceUnderTest.listSimulatorMerchants(fetchPolicy),
      ).resolves.toStrictEqual([GraphQLDataFactory.simulatorMerchant])
      verify(mockClient.query(anything())).once()
      const [args] = capture(mockClient.query as any).first()
      expect(args).toStrictEqual({
        fetchPolicy: 'cache-only',
        variables: undefined,
        query: ListSimulatorMerchantsDocument,
      })
    })
    it('handles thrown error from app sync call', async () => {
      when(mockClient.query(anything())).thenReject(
        new ApolloError({
          graphQLErrors: [new GraphQLError('appsync failure')],
        }),
      )
      await expect(
        instanceUnderTest.listSimulatorMerchants(CachePolicy.CacheOnly),
      ).rejects.toThrow(UnknownGraphQLError)
    })
    it('handles error from graphQl', async () => {
      when(mockClient.query(anything())).thenResolve({
        data: null,
        errors: [new GraphQLError('failed')],
        loading: false,
        networkStatus: NetworkStatus.error,
        stale: false,
      })
      await expect(
        instanceUnderTest.listSimulatorMerchants(CachePolicy.CacheOnly),
      ).rejects.toThrow(UnknownGraphQLError)
    })
  })
})
