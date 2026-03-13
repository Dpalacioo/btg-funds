import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../../core/services/balance.service';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../core/services/theme.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  balance$: Observable<number>;
  isDark = false;

  currentLanguage!: string;

  constructor(
    private balanceService: BalanceService,
    private themeService: ThemeService,
    private languageService: LanguageService,
  ) {
    this.balance$ = this.balanceService.balance$;
  }

  ngOnInit() {
    this.isDark = document.documentElement.classList.contains('dark');
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDark = document.documentElement.classList.contains('dark');
  }

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.currentLanguage = lang;
  }

  toggleLanguage() {
    const newLang = this.currentLanguage === 'es' ? 'en' : 'es';
    this.changeLanguage(newLang);
  }
}
