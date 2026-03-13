import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, BehaviorSubject } from 'rxjs';

import { UserFundsPageComponent } from './user-funds-page.component';

import { FundsService } from '../../../../core/services/funds.service';
import { BalanceService } from '../../../../core/services/balance.service';
import { TransactionsService } from '../../../../core/services/transactions.service';
import { ToastService } from '../../../../core/services/toast.service';

import { Fund } from '../../../../core/models/fund';
import { TransactionType } from '../../../../core/models/transaction-type';
import { Transaction } from '../../../../core/models/transaction';
import { TranslateModule } from '@ngx-translate/core';

describe('UserFundsPageComponent', () => {
  let component: UserFundsPageComponent;
  let fixture: ComponentFixture<UserFundsPageComponent>;

  let fundsServiceSpy: jasmine.SpyObj<FundsService>;
  let balanceServiceSpy: jasmine.SpyObj<BalanceService>;
  let transactionsServiceSpy: jasmine.SpyObj<TransactionsService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  const userFundsSubject = new BehaviorSubject<Fund[]>([]);

  const mockFund: Fund = {
    id: 1,
    name: 'FPV_BTG_PACTUAL_RECAUDADORA',
    minAmount: 75000,
    category: 'FPV',
  } as Fund;

  const mockTransaction: Transaction = {
    fundId: 1,
    fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
    amount: 75000,
    type: TransactionType.CANCEL,
    date: new Date().toISOString(),
  };

  beforeEach(async () => {
    fundsServiceSpy = jasmine.createSpyObj('FundsService', ['cancelFund'], {
      userFunds$: userFundsSubject.asObservable(),
    });

    balanceServiceSpy = jasmine.createSpyObj('BalanceService', [
      'getBalance',
      'updateBalance',
    ]);

    transactionsServiceSpy = jasmine.createSpyObj('TransactionsService', [
      'createTransaction',
    ]);

    toastServiceSpy = jasmine.createSpyObj('ToastService', ['show']);

    await TestBed.configureTestingModule({
      declarations: [UserFundsPageComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: FundsService, useValue: fundsServiceSpy },
        { provide: BalanceService, useValue: balanceServiceSpy },
        { provide: TransactionsService, useValue: transactionsServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFundsPageComponent);
    component = fixture.componentInstance;

    transactionsServiceSpy.createTransaction.and.returnValue(
      of(mockTransaction),
    );

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose userFunds$ observable from service', () => {
    expect(component.userFunds$).toBeDefined();
  });

  it('should open cancel modal', () => {
    component.openCancelModal(mockFund);

    expect(component.selectedFund).toEqual(mockFund);
    expect(component.showConfirmModal).toBeTrue();
  });

  it('should close modal', () => {
    component.selectedFund = mockFund;
    component.showConfirmModal = true;

    component.closeModal();

    expect(component.showConfirmModal).toBeFalse();
    expect(component.selectedFund).toBeNull();
  });

  it('should not cancel if no fund selected', () => {
    component.selectedFund = null;

    component.confirmCancel();

    expect(balanceServiceSpy.updateBalance).not.toHaveBeenCalled();
    expect(fundsServiceSpy.cancelFund).not.toHaveBeenCalled();
  });

  it('should cancel fund successfully', () => {
    balanceServiceSpy.getBalance.and.returnValue(100000);

    component.selectedFund = mockFund;

    component.confirmCancel();

    expect(balanceServiceSpy.updateBalance).toHaveBeenCalledWith(175000);

    expect(fundsServiceSpy.cancelFund).toHaveBeenCalledWith(mockFund.id);

    expect(transactionsServiceSpy.createTransaction).toHaveBeenCalled();

    expect(toastServiceSpy.show).toHaveBeenCalledWith({
      text: 'toast.cancelSuccess',
      type: 'success',
    });

    expect(component.selectedFund).toBeNull();
    expect(component.showConfirmModal).toBeFalse();
  });
});
