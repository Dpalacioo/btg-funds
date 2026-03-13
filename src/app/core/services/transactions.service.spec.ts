import { TestBed } from '@angular/core/testing';
import { TransactionsService } from './transactions.service';
import { Transaction } from '../models/transaction';
import { TransactionType } from '../models/transaction-type';
import { environment } from '../../../environments/environment';

import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/transactions`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch transactions', () => {
    const mockTransactions: Transaction[] = [
      {
        id: 1,
        fundId: 1,
        fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
        amount: 75000,
        type: TransactionType.SUBSCRIPTION,
        notificationMethod: 'EMAIL',
        date: new Date().toISOString(),
      },
    ];

    service.getTransactions().subscribe((transactions) => {
      expect(transactions.length).toBe(1);
      expect(transactions).toEqual(mockTransactions);
    });

    const req = httpMock.expectOne(apiUrl);

    expect(req.request.method).toBe('GET');

    req.flush(mockTransactions);
  });

  it('should create a transaction', () => {
    const transaction: Transaction = {
      fundId: 1,
      fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
      amount: 75000,
      type: TransactionType.SUBSCRIPTION,
      notificationMethod: 'EMAIL',
      date: new Date().toISOString(),
    };

    service.createTransaction(transaction).subscribe((res) => {
      expect(res).toEqual(transaction);
    });

    const req = httpMock.expectOne(apiUrl);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(transaction);

    req.flush(transaction);
  });

  it('should handle error when fetching transactions', () => {
    const consoleSpy = spyOn(console, 'error');

    service.getTransactions().subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.message).toBe('Error en la comunicación con el servidor');
      },
    });

    const req = httpMock.expectOne(apiUrl);

    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(consoleSpy).toHaveBeenCalledWith('API Error:', jasmine.anything());
  });

  it('should handle error when creating transaction', () => {
    const consoleSpy = spyOn(console, 'error');

    const transaction: Transaction = {
      fundId: 1,
      fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
      amount: 75000,
      type: TransactionType.SUBSCRIPTION,
      notificationMethod: 'EMAIL',
      date: new Date().toISOString(),
    };

    service.createTransaction(transaction).subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.message).toBe('Error en la comunicación con el servidor');
      },
    });

    const req = httpMock.expectOne(apiUrl);

    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(consoleSpy).toHaveBeenCalledWith('API Error:', jasmine.anything());
  });
});
