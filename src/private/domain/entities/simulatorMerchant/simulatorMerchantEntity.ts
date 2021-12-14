export interface SimulatorMerchantEntity {
  id: string
  createdAt: Date
  updatedAt: Date
  description: string
  name: string
  mcc: string
  city: string
  state?: string
  postalCode: string
  country: string
  currency: string
  declineAfterAuthorization: boolean
  declineBeforeAuthorization: boolean
}
