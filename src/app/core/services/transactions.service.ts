import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Transaction } from '../models/transaction';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private apiUrl = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http
      .post<Transaction>(this.apiUrl, transaction)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error:', error);

    return throwError(
      () => new Error('Error en la comunicación con el servidor'),
    );
  }
}
