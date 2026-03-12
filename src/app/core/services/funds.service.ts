import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fund } from '../models/fund';

@Injectable({
  providedIn: 'root',
})
export class FundsService {
  private apiUrl = 'http://localhost:3000/funds';

  constructor(private http: HttpClient) {}

  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.apiUrl);
  }
}
