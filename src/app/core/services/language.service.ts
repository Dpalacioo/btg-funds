import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'app-language';

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  private initLanguage() {
    const savedLang = localStorage.getItem(this.STORAGE_KEY) ?? 'es';

    this.translate.addLangs(['es', 'en']);

    this.translate.setFallbackLang('es');

    this.translate.use(savedLang);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  getCurrentLanguage(): string {
    return this.translate.getCurrentLang() ?? 'es';
  }
}
