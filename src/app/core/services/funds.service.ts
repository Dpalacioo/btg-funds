import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fund } from '../models/fund';

@Injectable({
  providedIn: 'root',
})
export class FundsService {
  private apiUrl = 'http://localhost:3000/funds';

  private userFundsSubject = new BehaviorSubject<Fund[]>([]);
  userFunds$ = this.userFundsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.apiUrl);
  }

  subscribeToFund(fund: Fund) {
    const currentFunds = this.userFundsSubject.value;

    this.userFundsSubject.next([...currentFunds, fund]);
  }

  cancelFund(fundId: number) {
    const currentFunds = this.userFundsSubject.value;

    const updatedFunds = currentFunds.filter((f) => f.id !== fundId);

    this.userFundsSubject.next(updatedFunds);
  }
}
