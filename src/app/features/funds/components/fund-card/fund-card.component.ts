import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Fund } from '../../../../core/models/fund';
import { BalanceService } from '../../../../core/services/balance.service';
import { TransactionsService } from '../../../../core/services/transactions.service';
import { FundsService } from '../../../../core/services/funds.service';
import { ToastService } from '../../../../core/services/toast.service';

import { Transaction } from '../../../../core/models/transaction';
import { TransactionType } from '../../../../core/models/transaction-type';

@Component({
  selector: 'app-fund-card',
  templateUrl: './fund-card.component.html',
  styleUrls: ['./fund-card.component.scss'],
})
export class FundCardComponent {
  @Input() fund!: Fund;

  showConfirmModal = false;
  loading = false;

  subscriptionForm: FormGroup;

  constructor(
    private balanceService: BalanceService,
    private transactionsService: TransactionsService,
    private fundService: FundsService,
    private toastService: ToastService,
    private fb: FormBuilder,
  ) {
    this.subscriptionForm = this.fb.group({
      notificationMethod: ['email', Validators.required],
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{7,15}$')]],
    });

    this.subscriptionForm
      .get('notificationMethod')
      ?.valueChanges.subscribe((method) => {
        const emailControl = this.subscriptionForm.get('email');
        const phoneControl = this.subscriptionForm.get('phone');

        if (method === 'email') {
          emailControl?.setValidators([Validators.required, Validators.email]);
          phoneControl?.clearValidators();
        } else {
          phoneControl?.setValidators([
            Validators.required,
            Validators.pattern('^[0-9]{7,15}$'),
          ]);
          emailControl?.clearValidators();
        }

        emailControl?.updateValueAndValidity();
        phoneControl?.updateValueAndValidity();
      });
  }

  openConfirmModal() {
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  confirmSubscription() {
    const method = this.subscriptionForm.value.notificationMethod;

    if (
      (method === 'email' && this.subscriptionForm.get('email')?.invalid) ||
      (method === 'sms' && this.subscriptionForm.get('phone')?.invalid)
    ) {
      this.toastService.show({
        text: 'errors.invalidNotification',
        type: 'error',
      });
      return;
    }

    const currentBalance = this.balanceService.getBalance();

    if (currentBalance < this.fund.minAmount) {
      this.toastService.show({
        text: 'errors.insufficientBalance',
        type: 'error',
      });
      return;
    }

    this.loading = true;

    setTimeout(() => {
      const newBalance = currentBalance - this.fund.minAmount;

      this.balanceService.updateBalance(newBalance);

      this.fundService.subscribeToFund(this.fund);

      const transaction: Transaction = {
        fundId: this.fund.id,
        fundName: this.fund.name,
        amount: this.fund.minAmount,
        type: TransactionType.SUBSCRIPTION,
        notificationMethod: method.toUpperCase() as 'EMAIL' | 'SMS',
        date: new Date().toISOString(),
      };

      this.transactionsService.createTransaction(transaction).subscribe();

      this.toastService.show({
        text: 'toast.subscriptionSuccess',
        type: 'success',
      });

      this.loading = false;
      this.closeConfirmModal();
    }, 800);
  }
}
