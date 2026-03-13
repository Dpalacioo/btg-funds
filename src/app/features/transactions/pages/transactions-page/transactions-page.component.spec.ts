import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsPageComponent } from './transactions-page.component';

import { TransactionsService } from '../../../../core/services/transactions.service';
import { Transaction } from '../../../../core/models/transaction';
import { TransactionType } from '../../../../core/models/transaction-type';

import { of, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('TransactionsPageComponent', () => {
  let component: TransactionsPageComponent;
  let fixture: ComponentFixture<TransactionsPageComponent>;
  let transactionsServiceSpy: jasmine.SpyObj<TransactionsService>;

  const mockTransactions: Transaction[] = [
    {
      id: 1,
      fundId: 1,
      fundName: 'Fund A',
      amount: 200,
      type: TransactionType.SUBSCRIPTION,
      notificationMethod: 'EMAIL',
      date: '2024-03-01',
    },
    {
      id: 2,
      fundId: 2,
      fundName: 'Fund B',
      amount: 100,
      type: TransactionType.CANCEL,
      notificationMethod: 'EMAIL',
      date: '2024-03-05',
    },
    {
      id: 3,
      fundId: 3,
      fundName: 'Fund C',
      amount: 300,
      type: TransactionType.SUBSCRIPTION,
      notificationMethod: 'EMAIL',
      date: '2024-02-28',
    },
  ];

  beforeEach(async () => {
    transactionsServiceSpy = jasmine.createSpyObj('TransactionsService', [
      'getTransactions',
    ]);

    await TestBed.configureTestingModule({
      declarations: [TransactionsPageComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: TransactionsService, useValue: transactionsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsPageComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadTransactions on ngOnInit', () => {
    const spy = spyOn(component, 'loadTransactions');

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should call TransactionsService.getTransactions()', () => {
    transactionsServiceSpy.getTransactions.and.returnValue(
      of(mockTransactions),
    );

    component.loadTransactions();

    expect(transactionsServiceSpy.getTransactions).toHaveBeenCalled();
  });

  it('should load and sort transactions by date descending', () => {
    transactionsServiceSpy.getTransactions.and.returnValue(
      of(mockTransactions),
    );

    component.loadTransactions();

    expect(component.transactions.length).toBe(3);

    expect(component.transactions[0].date).toBe('2024-03-05');
    expect(component.transactions[1].date).toBe('2024-03-01');
    expect(component.transactions[2].date).toBe('2024-02-28');
  });

  it('should handle error when loading transactions', () => {
    const consoleSpy = spyOn(console, 'error');

    transactionsServiceSpy.getTransactions.and.returnValue(
      throwError(() => new Error('Error')),
    );

    component.loadTransactions();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error loading transactions',
      jasmine.any(Error),
    );
  });
});
