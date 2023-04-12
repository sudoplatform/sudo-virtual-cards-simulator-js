/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SimulatorMerchantEntityTransformer } from '../../../../../../src/private/data/simulatorMerchant/transformer/simulatorMerchantEntityTransformer'
import { EntityDataFactory } from '../../../../data-factory/entity'
import { GraphQLDataFactory } from '../../../../data-factory/graphQl'

describe('SimulatorMerchantEntityTransformer Test Suite', () => {
  it('transforms successfully', () => {
    expect(
      SimulatorMerchantEntityTransformer.transform(
        GraphQLDataFactory.simulatorMerchant,
      ),
    ).toStrictEqual(EntityDataFactory.simulatorMerchant)
  })
})
