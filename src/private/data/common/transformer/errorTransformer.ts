import {
  AppSyncError,
  mapGraphQLToClientError,
  VersionMismatchError,
} from '@sudoplatform/sudo-common'
import { TransactionNotFoundError } from '../../../../public/errors'

export class ErrorTransformer {
  static toClientError(error: AppSyncError): Error {
    switch (error.errorType) {
      case 'DynamoDB:ConditionalCheckFailedException':
        return new VersionMismatchError()
      case 'sudoplatform.virtual-cards.TransactionNotFoundError':
        return new TransactionNotFoundError(error.message)
      default:
        return mapGraphQLToClientError(error)
    }
  }
}
