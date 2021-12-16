import { CachePolicy } from '@sudoplatform/sudo-common'
import { CurrencyAmountEntity } from '../common/currenyAmountEntity'
import { SimulatorMerchantEntity } from './simulatorMerchantEntity'

export interface SimulatorMerchantServiceListMerchantsInput {
  cachePolicy?: CachePolicy
}

export interface SimulatorMerchantServiceListConversionRatesInput {
  cachePolicy?: CachePolicy
}

export interface SimulatorMerchantService {
  listMerchants(
    input?: SimulatorMerchantServiceListMerchantsInput,
  ): Promise<SimulatorMerchantEntity[]>
  listConversionRates(
    input?: SimulatorMerchantServiceListConversionRatesInput,
  ): Promise<CurrencyAmountEntity[]>
}
