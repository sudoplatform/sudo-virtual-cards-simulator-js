import { CurrencyAmountEntity } from '../common/currenyAmountEntity'

export interface SimulatorReversalTransactionEntity {
  id: string
  billedAmount: CurrencyAmountEntity
  createdAt: Date
  updatedAt: Date
}
