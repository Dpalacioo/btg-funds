import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private balanceSubject = new BehaviorSubject<number>(500000);

  balance$ = this.balanceSubject.asObservable();

  getBalance(): number {
    return this.balanceSubject.value;
  }

  updateBalance(newBalance: number) {
    this.balanceSubject.next(newBalance);
  }
}
