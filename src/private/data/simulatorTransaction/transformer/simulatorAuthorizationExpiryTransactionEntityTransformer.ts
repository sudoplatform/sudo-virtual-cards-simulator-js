import { SimulateAuthorizationExpiryResponse } from '../../../../gen/graphqlTypes'
import { SimulatorAuthorizationExpiryTransactionEntity } from '../../../domain/entities/simulatorTransaction/simulatorAuthorizationExpiryTransactionEntity'

export class SimulatorAuthorizationExpiryTransactionEntityTransformer {
  static transform(
    graphQl: SimulateAuthorizationExpiryResponse,
  ): SimulatorAuthorizationExpiryTransactionEntity {
    return {
      id: graphQl.id,
      createdAt: new Date(graphQl.createdAtEpochMs),
      updatedAt: new Date(graphQl.updatedAtEpochMs),
    }
  }
}
