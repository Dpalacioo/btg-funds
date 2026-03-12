import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../../core/services/transactions.service';
import { Transaction } from '../../../../core/models/transaction';
import { TransactionType } from '../../../../core/models/transaction-type';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss'],
})
export class TransactionsPageComponent implements OnInit {
  transactions: Transaction[] = [];

  TransactionType = TransactionType;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionsService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      },
      error: (err) => {
        console.error('Error loading transactions', err);
      },
    });
  }
}
