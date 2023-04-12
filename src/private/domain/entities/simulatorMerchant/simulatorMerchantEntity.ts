/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SimulatorMerchantEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  description: string
  name: string
  mcc: string
  city: string
  state?: string
  postalCode: string
  country: string
  currency: string
  declineAfterAuthorization: boolean
  declineBeforeAuthorization: boolean
}
