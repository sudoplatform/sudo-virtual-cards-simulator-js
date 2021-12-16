import { CurrencyAmountEntity } from '../../../src/private/domain/entities/common/currenyAmountEntity'
import { SimulatorMerchantEntity } from '../../../src/private/domain/entities/simulatorMerchant/simulatorMerchantEntity'
import { SimulatorReversalTransactionEntity } from '../../../src/private/domain/entities/simulatorTransaction/simulateReversalTransactionEntity'
import { SimulatorAuthorizationExpiryTransactionEntity } from '../../../src/private/domain/entities/simulatorTransaction/simulatorAuthorizationExpiryTransactionEntity'
import { SimulatorAuthorizeTransactionEntity } from '../../../src/private/domain/entities/simulatorTransaction/simulatorAuthorizeTransactionEntity'
import { SimulatorDebitTransactionEntity } from '../../../src/private/domain/entities/simulatorTransaction/simulatorDebitTransactionEntity'
import { SimulatorRefundTransactionEntity } from '../../../src/private/domain/entities/simulatorTransaction/simulatorRefundTransactionEntity'

export class EntityDataFactory {
  private static readonly commonProps = {
    id: 'dummyId',
    createdAt: new Date(1.0),
    updatedAt: new Date(2.0),
  }

  static readonly simulatorMerchant: SimulatorMerchantEntity = {
    ...EntityDataFactory.commonProps,
    currency: 'dummyCurrency',
    city: 'dummyCity',
    country: 'dummyCountry',
    declineAfterAuthorization: true,
    declineBeforeAuthorization: true,
    description: 'dummyDescription',
    mcc: 'dummyMCC',
    name: 'dummyName',
    postalCode: 'dummyPostalCode',
    state: 'dummyState',
  }

  static readonly currencyAmount: CurrencyAmountEntity = {
    currency: 'dummyCurrency',
    amount: 100,
  }

  static readonly simulatorAuthorizeTransactionEntity: SimulatorAuthorizeTransactionEntity =
    {
      ...this.commonProps,
      approved: true,
      billed: EntityDataFactory.currencyAmount,
      billedAmount: EntityDataFactory.currencyAmount,
      declineReason: 'dummyDeclineReason',
    }

  static readonly simulatorReversalTransactionEntity: SimulatorReversalTransactionEntity =
    {
      ...this.commonProps,
      billedAmount: EntityDataFactory.currencyAmount,
    }

  static readonly simulatorAuthorizationExpiryTransactionEntity: SimulatorAuthorizationExpiryTransactionEntity =
    {
      ...this.commonProps,
    }

  static readonly simulatorRefundTransactionEntity: SimulatorRefundTransactionEntity =
    {
      ...this.commonProps,
      billedAmount: EntityDataFactory.currencyAmount,
    }

  static readonly simulatorDebitTransactionEntity: SimulatorDebitTransactionEntity =
    {
      ...this.commonProps,
      billedAmount: EntityDataFactory.currencyAmount,
    }
}
