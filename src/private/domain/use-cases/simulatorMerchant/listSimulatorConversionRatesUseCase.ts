import { CachePolicy } from '@sudoplatform/sudo-common'
import { SimulatorMerchantService } from '../../entities/simulatorMerchant/simulatorMerchantService'

interface ListSimulatorConversionRatesUseCaseInput {
  cachePolicy?: CachePolicy
}

type ListSimulatorConversionRatesUseCaseOutput = {
  currency: string
  amount: number
}[]

export class ListSimulatorConversionRatesUseCase {
  constructor(
    private readonly simulatorMerchantService: SimulatorMerchantService,
  ) {}

  async execute(
    input?: ListSimulatorConversionRatesUseCaseInput,
  ): Promise<ListSimulatorConversionRatesUseCaseOutput> {
    return await this.simulatorMerchantService.listConversionRates(input)
  }
}
