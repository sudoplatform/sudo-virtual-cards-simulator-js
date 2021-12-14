import { CurrencyAmount } from '../../../../public/typings/currencyAmount'

export interface SimulatorAuthorizeTransactionEntity {
  id: string
  approved: boolean
  billed: CurrencyAmount
  billedAmount: CurrencyAmount
  declineReason?: string
  createdAt: Date
  updatedAt: Date
}
