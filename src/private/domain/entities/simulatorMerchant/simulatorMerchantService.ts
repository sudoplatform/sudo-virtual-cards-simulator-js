import { CachePolicy } from '@sudoplatform/sudo-common'
import { SimulatorMerchantEntity } from './simulatorMerchantEntity'

export interface SimulatorMerchantServiceListMerchantsInput {
  cachePolicy?: CachePolicy
}

export interface SimulatorMerchantService {
  listMerchants(
    input?: SimulatorMerchantServiceListMerchantsInput,
  ): Promise<SimulatorMerchantEntity[]>
}
