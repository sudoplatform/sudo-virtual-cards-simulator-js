import { CurrencyAmount } from '../../../..'
import { SimulatorTransactionService } from '../../entities/simulatorTransaction/simulatorTransactionService'

interface SimulateDebitUseCaseInput {
  authorizationId: string
  amount: number
}

interface SimulateDebitUseCaseOutput {
  id: string
  billedAmount: CurrencyAmount
  createdAt: Date
  updatedAt: Date
}

export class SimulateDebitTransactionUseCase {
  constructor(
    private readonly simulatorTransactionService: SimulatorTransactionService,
  ) {}

  async execute(
    input: SimulateDebitUseCaseInput,
  ): Promise<SimulateDebitUseCaseOutput> {
    return await this.simulatorTransactionService.debit(input)
  }
}
