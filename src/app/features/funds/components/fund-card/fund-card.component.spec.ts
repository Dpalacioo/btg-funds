import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { FundCardComponent } from './fund-card.component';

import { BalanceService } from '../../../../core/services/balance.service';
import { TransactionsService } from '../../../../core/services/transactions.service';
import { FundsService } from '../../../../core/services/funds.service';
import { ToastService } from '../../../../core/services/toast.service';

import { Fund } from '../../../../core/models/fund';
import { TransactionType } from '../../../../core/models/transaction-type';
import { Transaction } from '../../../../core/models/transaction';
import { TranslateModule } from '@ngx-translate/core';

describe('FundCardComponent', () => {
  let component: FundCardComponent;
  let fixture: ComponentFixture<FundCardComponent>;

  let balanceServiceSpy: jasmine.SpyObj<BalanceService>;
  let transactionsServiceSpy: jasmine.SpyObj<TransactionsService>;
  let fundsServiceSpy: jasmine.SpyObj<FundsService>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;

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
    type: TransactionType.SUBSCRIPTION,
    notificationMethod: 'EMAIL',
    date: new Date().toISOString(),
  };

  beforeEach(async () => {
    balanceServiceSpy = jasmine.createSpyObj('BalanceService', [
      'getBalance',
      'updateBalance',
    ]);

    transactionsServiceSpy = jasmine.createSpyObj('TransactionsService', [
      'createTransaction',
    ]);

    fundsServiceSpy = jasmine.createSpyObj('FundsService', [
      'subscribeToFund',
    ]);

    toastServiceSpy = jasmine.createSpyObj('ToastService', ['show']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [FundCardComponent],
      providers: [
        { provide: BalanceService, useValue: balanceServiceSpy },
        { provide: TransactionsService, useValue: transactionsServiceSpy },
        { provide: FundsService, useValue: fundsServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FundCardComponent);
    component = fixture.componentInstance;

    component.fund = mockFund;

    transactionsServiceSpy.createTransaction.and.returnValue(
      of(mockTransaction)
    );

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open confirm modal', () => {
    component.openConfirmModal();
    expect(component.showConfirmModal).toBeTrue();
  });

  it('should close confirm modal', () => {
    component.closeConfirmModal();
    expect(component.showConfirmModal).toBeFalse();
  });

  it('should prevent non numeric input', () => {
    const event = new KeyboardEvent('keydown', { key: 'a' });
    spyOn(event, 'preventDefault');

    component.allowOnlyNumbers(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should allow navigation keys in allowOnlyNumbers', () => {
    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    spyOn(event, 'preventDefault');

    component.allowOnlyNumbers(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should allow ctrl shortcuts in allowOnlyNumbers', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'v',
      ctrlKey: true,
    });

    spyOn(event, 'preventDefault');

    component.allowOnlyNumbers(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should apply email validators when notification method is email', () => {
    component.subscriptionForm.patchValue({
      notificationMethod: 'email',
    });

    const emailControl = component.subscriptionForm.get('email');

    emailControl?.setValue('');

    expect(emailControl?.invalid).toBeTrue();
  });

  it('should apply phone validators when notification method is sms', () => {
    component.subscriptionForm.patchValue({
      notificationMethod: 'sms',
    });

    const phoneControl = component.subscriptionForm.get('phone');

    phoneControl?.setValue('');

    expect(phoneControl?.invalid).toBeTrue();
  });

  it('should show error toast if email notification is invalid', () => {
    component.subscriptionForm.patchValue({
      notificationMethod: 'email',
      email: '',
    });

    component.confirmSubscription();

    expect(toastServiceSpy.show).toHaveBeenCalledWith({
      text: 'errors.invalidNotification',
      type: 'error',
    });
  });

  it('should show error toast if sms notification is invalid', () => {
    component.subscriptionForm.patchValue({
      notificationMethod: 'sms',
      phone: '',
    });

    component.confirmSubscription();

    expect(toastServiceSpy.show).toHaveBeenCalledWith({
      text: 'errors.invalidNotification',
      type: 'error',
    });
  });

  it('should show insufficient balance error', () => {
    balanceServiceSpy.getBalance.and.returnValue(1000);

    component.subscriptionForm.patchValue({
      notificationMethod: 'email',
      email: 'test@test.com',
    });

    component.confirmSubscription();

    expect(toastServiceSpy.show).toHaveBeenCalledWith({
      text: 'errors.insufficientBalance',
      type: 'error',
    });
  });

  it('should complete subscription successfully', fakeAsync(() => {
    balanceServiceSpy.getBalance.and.returnValue(100000);

    component.subscriptionForm.patchValue({
      notificationMethod: 'email',
      email: 'test@test.com',
    });

    component.confirmSubscription();

    tick(800);

    expect(balanceServiceSpy.updateBalance).toHaveBeenCalled();
    expect(fundsServiceSpy.subscribeToFund).toHaveBeenCalledWith(mockFund);
    expect(transactionsServiceSpy.createTransaction).toHaveBeenCalled();

    expect(toastServiceSpy.show).toHaveBeenCalledWith({
      text: 'toast.subscriptionSuccess',
      type: 'success',
    });

    expect(component.loading).toBeFalse();
    expect(component.showConfirmModal).toBeFalse();
  }));
});
