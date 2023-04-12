/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SimulatorReversalTransactionEntityTransformer } from '../../../../../../src/private/data/simulatorTransaction/transformer/simulatorReversalTransactionEntityTransformer'
import { EntityDataFactory } from '../../../../data-factory/entity'
import { GraphQLDataFactory } from '../../../../data-factory/graphQl'

describe('SimulatorReversalTransactionEntityTransformer Test Suite', () => {
  it('transforms successfully', () => {
    expect(
      SimulatorReversalTransactionEntityTransformer.transform(
        GraphQLDataFactory.simulateReversalResponse,
      ),
    ).toStrictEqual(EntityDataFactory.simulatorReversalTransactionEntity)
  })
})
