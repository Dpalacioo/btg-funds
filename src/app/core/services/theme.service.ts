import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeKey = 'btg-theme';

  constructor() {
    this.loadTheme();
  }

  toggleTheme() {

    const html = document.documentElement;

    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem(this.themeKey, 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem(this.themeKey, 'dark');
    }

  }

  loadTheme() {

    const savedTheme = localStorage.getItem(this.themeKey);

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }

  }

}