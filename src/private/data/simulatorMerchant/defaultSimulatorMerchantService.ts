import { SimulatorMerchantEntity } from '../../domain/entities/simulatorMerchant/simulatorMerchantEntity'
import {
  SimulatorMerchantService,
  SimulatorMerchantServiceListMerchantsInput,
} from '../../domain/entities/simulatorMerchant/simulatorMerchantService'
import { ApiClient } from '../common/apiClient'
import { FetchPolicyTransformer } from '../common/transformer/fetchPolicyTransformer'
import { SimulatorMerchantEntityTransformer } from './transformer/simulatorMerchantEntityTransformer'

export class DefaultSimulatorMerchantService
  implements SimulatorMerchantService
{
  constructor(private readonly apiClient: ApiClient) {}

  async listMerchants(
    input?: SimulatorMerchantServiceListMerchantsInput,
  ): Promise<SimulatorMerchantEntity[]> {
    const fetchPolicy = input?.cachePolicy
      ? FetchPolicyTransformer.transformCachePolicy(input.cachePolicy)
      : 'network-only'
    const result = await this.apiClient.listSimulatorMerchants(fetchPolicy)
    return result.map(SimulatorMerchantEntityTransformer.transform)
  }
}
