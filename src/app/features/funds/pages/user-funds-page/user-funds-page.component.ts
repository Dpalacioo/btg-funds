import { Component } from '@angular/core';
import { FundsService } from '../../../../core/services/funds.service';
import { BalanceService } from '../../../../core/services/balance.service';
import { TransactionsService } from '../../../../core/services/transactions.service';

import { Observable } from 'rxjs';
import { Fund } from '../../../../core/models/fund';
import { Transaction } from '../../../../core/models/transaction';
import { TransactionType } from '../../../../core/models/transaction-type';

@Component({
  selector: 'app-user-funds-page',
  templateUrl: './user-funds-page.component.html',
  styleUrls: ['./user-funds-page.component.scss'],
})
export class UserFundsPageComponent {
  userFunds$: Observable<Fund[]>;

  constructor(
    private fundsService: FundsService,
    private balanceService: BalanceService,
    private transactionsService: TransactionsService,
  ) {
    this.userFunds$ = this.fundsService.userFunds$;
  }

  cancelFund(fund: Fund) {
    const currentBalance = this.balanceService.getBalance();
    const newBalance = currentBalance + fund.minAmount;

    this.balanceService.updateBalance(newBalance);

    this.fundsService.cancelFund(fund.id);

    const transaction: Transaction = {
      fundId: fund.id,
      fundName: fund.name,
      amount: fund.minAmount,
      type: TransactionType.CANCEL,
      date: new Date().toISOString(),
    };

    this.transactionsService.createTransaction(transaction).subscribe();

    alert('Participación cancelada correctamente');
  }
}
