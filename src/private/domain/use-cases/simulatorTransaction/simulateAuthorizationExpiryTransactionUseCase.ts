import { SimulatorTransactionService } from '../../entities/simulatorTransaction/simulatorTransactionService'

interface SimulateAuthorizationExpiryUseCaseInput {
  authorizationId: string
}

interface SimulateAuthorizationExpiryUseCaseOutput {
  id: string
  createdAt: Date
  updatedAt: Date
}

export class SimulateAuthorizationExpiryTransactionUseCase {
  constructor(
    private readonly simulatorTransactionService: SimulatorTransactionService,
  ) {}

  async execute(
    input: SimulateAuthorizationExpiryUseCaseInput,
  ): Promise<SimulateAuthorizationExpiryUseCaseOutput> {
    return await this.simulatorTransactionService.expireAuthorization(input)
  }
}
