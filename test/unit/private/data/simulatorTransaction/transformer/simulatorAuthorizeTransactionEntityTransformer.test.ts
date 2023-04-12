/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SimulatorAuthorizeTransactionEntityTransformer } from '../../../../../../src/private/data/simulatorTransaction/transformer/simulatorAuthorizeTransactionEntityTransformer'
import { EntityDataFactory } from '../../../../data-factory/entity'
import { GraphQLDataFactory } from '../../../../data-factory/graphQl'

describe('SimulatorAuthorizeTransactionEntityTransformer Test Suite', () => {
  it('transforms successfully', () => {
    expect(
      SimulatorAuthorizeTransactionEntityTransformer.transform(
        GraphQLDataFactory.simulateAuthorizationResponse,
      ),
    ).toStrictEqual(EntityDataFactory.simulatorAuthorizeTransactionEntity)
  })
})
