import { CurrencyAmountEntity } from '../common/currenyAmountEntity'

export interface SimulatorRefundTransactionEntity {
  id: string
  billedAmount: CurrencyAmountEntity
  createdAt: Date
  updatedAt: Date
}
