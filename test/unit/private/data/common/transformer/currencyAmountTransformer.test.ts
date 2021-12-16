import { CurrencyAmountEntityTransformer } from '../../../../../../src/private/data/common/transformer/currencyAmountEntityTransformer'

describe('CurrencyAmountEntityTransformer Test Suite', () => {
  describe('transformCachePolicy', () => {
    it('converts graphql to entity', () => {
      expect(
        CurrencyAmountEntityTransformer.transform({
          currency: 'aa',
          amount: 100,
        }),
      ).toStrictEqual({ currency: 'aa', amount: 100 })
    })
  })
})
