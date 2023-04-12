/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 *
 * @property {string} id ID of the merchant for use in simulated transaction requests.
 * @property {string} name Name of merchant - used as transaction descriptions.
 * @property {string} mcc Merchant category code of merchant.
 * @property {string} city City of merchant.
 * @property {string} state State of merchant.
 * @property {string} postalCode Postal code of merchant.
 * @property {string} country Country of merchant.
 * @property {string} currency Currency ISO code charged by merchant.
 * @property {boolean} declineAfterAuthorization Depicts that a transaction request made to this merchant will be authorized at the virtual cards service level, and then immediately declined once it reaches the 'provider level.
 * @property {boolean} declineBeforeAuthorization Depicts that a transaction request made to this merchant will be automatically declined before it reaches the authorization level at the Virtual Card Service.
 * @property {Date} createdAt Date/timestamp that this resource was created.
 * @property {Date} updatedAt Date/timestamp that this resource was last updated.
 */
export interface SimulatorMerchant {
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
