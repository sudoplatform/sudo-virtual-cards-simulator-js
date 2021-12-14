import { SimulatorMerchant } from '../../../../gen/graphqlTypes'
import { SimulatorMerchantEntity } from '../../../domain/entities/simulatorMerchant/simulatorMerchantEntity'

export class SimulatorMerchantEntityTransformer {
  static transform(data: SimulatorMerchant): SimulatorMerchantEntity {
    return {
      id: data.id,
      createdAt: new Date(data.createdAtEpochMs),
      updatedAt: new Date(data.updatedAtEpochMs),
      description: data.description,
      name: data.name,
      mcc: data.mcc,
      city: data.city,
      state: data.state ?? undefined,
      postalCode: data.postalCode,
      country: data.country,
      currency: data.currency,
      declineAfterAuthorization: data.declineAfterAuthorization,
      declineBeforeAuthorization: data.declineBeforeAuthorization,
    }
  }
}
