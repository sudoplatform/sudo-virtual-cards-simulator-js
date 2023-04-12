/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

class VirtualCardsSimulatorError extends Error {
  constructor(msg?: string) {
    super(msg)
    this.name = this.constructor.name
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

/**
 * Transaction could not be found on the API call.
 */
export class TransactionNotFoundError extends VirtualCardsSimulatorError {
  constructor(msg?: string) {
    super(msg)
  }
}
