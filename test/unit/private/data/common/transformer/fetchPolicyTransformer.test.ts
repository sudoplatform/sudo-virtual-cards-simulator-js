import { CachePolicy } from '@sudoplatform/sudo-common'
import { FetchPolicyTransformer } from '../../../../../../src/private/data/common/transformer/fetchPolicyTransformer'

describe('FetchPolicyTransformer Test Suite', () => {
  describe('transformCachePolicy', () => {
    it.each`
      input                     | expected
      ${CachePolicy.CacheOnly}  | ${'cache-only'}
      ${CachePolicy.RemoteOnly} | ${'network-only'}
    `(
      'converts cache policy ($input) to fetch policy ($expected)',
      ({ input, expected }) => {
        expect(
          FetchPolicyTransformer.transformCachePolicy(input),
        ).toStrictEqual(expected)
      },
    )
  })
})
