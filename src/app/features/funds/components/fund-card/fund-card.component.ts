import { Component, Input } from '@angular/core';
import { Fund } from '../../../../core/models/fund';
import { BalanceService } from '../../../../core/services/balance.service';
import { TransactionsService } from '../../../../core/services/transactions.service';
import { TransactionType } from '../../../../core/models/transaction-type';
import { FundsService } from '../../../../core/services/funds.service';

@Component({
  selector: 'app-fund-card',
  templateUrl: './fund-card.component.html',
  styleUrls: ['./fund-card.component.scss'],
})
export class FundCardComponent {

  @Input() fund!: Fund;

  showConfirmModal = false;

  constructor(
    private balanceService: BalanceService,
    private transactionsService: TransactionsService,
    private fundService: FundsService
  ) {}

  openConfirmModal() {
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
  }

  confirmSubscription() {

    this.showConfirmModal = false;

    const currentBalance = this.balanceService.getBalance();

    if (currentBalance < this.fund.minAmount) {
      alert('No tiene saldo suficiente para suscribirse a este fondo');
      return;
    }

    const newBalance = currentBalance - this.fund.minAmount;

    this.balanceService.updateBalance(newBalance);

    this.fundService.subscribeToFund(this.fund);

    const transaction = {
      fundId: this.fund.id,
      fundName: this.fund.name,
      amount: this.fund.minAmount,
      type: TransactionType.SUBSCRIPTION,
      date: new Date().toISOString(),
    };

    this.transactionsService.createTransaction(transaction).subscribe();

  }

}