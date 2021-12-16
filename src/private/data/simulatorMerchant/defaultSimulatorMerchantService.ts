import { CurrencyAmountEntity } from '../../domain/entities/common/currenyAmountEntity'
import { SimulatorMerchantEntity } from '../../domain/entities/simulatorMerchant/simulatorMerchantEntity'
import {
  SimulatorMerchantService,
  SimulatorMerchantServiceListConversionRatesInput,
  SimulatorMerchantServiceListMerchantsInput,
} from '../../domain/entities/simulatorMerchant/simulatorMerchantService'
import { ApiClient } from '../common/apiClient'
import { CurrencyAmountEntityTransformer } from '../common/transformer/currencyAmountEntityTransformer'
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

  async listConversionRates(
    input?: SimulatorMerchantServiceListConversionRatesInput,
  ): Promise<CurrencyAmountEntity[]> {
    const fetchPolicy = input?.cachePolicy
      ? FetchPolicyTransformer.transformCachePolicy(input.cachePolicy)
      : 'network-only'
    const result = await this.apiClient.listSimulatorConversionRates(
      fetchPolicy,
    )
    return result.map(CurrencyAmountEntityTransformer.transform)
  }
}
