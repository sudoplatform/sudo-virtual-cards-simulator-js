import { CurrencyAmountEntity } from '../common/currenyAmountEntity'

export interface SimulatorDebitTransactionEntity {
  id: string
  billedAmount: CurrencyAmountEntity
  createdAt: Date
  updatedAt: Date
}
