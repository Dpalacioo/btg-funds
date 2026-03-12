import { Component } from '@angular/core';
import { BalanceService } from '../../../core/services/balance.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  balance$: Observable<number>;

  constructor(private balanceService: BalanceService) {
    this.balance$ = this.balanceService.balance$;
  }
}
