import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../../core/services/balance.service';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  balance$: Observable<number>;
  isDark = false;

  constructor(
    private balanceService: BalanceService,
    private themeService: ThemeService
  ) {
    this.balance$ = this.balanceService.balance$;
  }

  ngOnInit() {
    this.isDark = document.documentElement.classList.contains('dark');
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDark = document.documentElement.classList.contains('dark');
  }

}