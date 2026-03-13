import { Component } from '@angular/core';
import { FundsService } from '../../../../core/services/funds.service';
import { BalanceService } from '../../../../core/services/balance.service';
import { TransactionsService } from '../../../../core/services/transactions.service';

import { Observable } from 'rxjs';
import { Fund } from '../../../../core/models/fund';
import { Transaction } from '../../../../core/models/transaction';
import { TransactionType } from '../../../../core/models/transaction-type';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-user-funds-page',
  templateUrl: './user-funds-page.component.html',
  styleUrls: ['./user-funds-page.component.scss'],
})
export class UserFundsPageComponent {
  userFunds$: Observable<Fund[]>;

  selectedFund: Fund | null = null;
  showConfirmModal = false;

  constructor(
    private fundsService: FundsService,
    private balanceService: BalanceService,
    private transactionsService: TransactionsService,
    private toastService: ToastService,
  ) {
    this.userFunds$ = this.fundsService.userFunds$;
  }

  openCancelModal(fund: Fund) {
    this.selectedFund = fund;
    this.showConfirmModal = true;
  }

  closeModal() {
    this.showConfirmModal = false;
    this.selectedFund = null;
  }

  confirmCancel() {
    if (!this.selectedFund) return;

    const fund = this.selectedFund;

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

    this.toastService.show({
      text: 'toast.cancelSuccess',
      type: 'success',
    });

    this.closeModal();
  }
}
