import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

import { BalanceService } from '../../../core/services/balance.service';
import { ThemeService } from '../../../core/services/theme.service';
import { LanguageService } from '../../../core/services/language.service';

import { BehaviorSubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let balanceServiceSpy: jasmine.SpyObj<BalanceService>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;

  const balanceSubject = new BehaviorSubject<number>(500000);

  beforeEach(async () => {
    balanceServiceSpy = jasmine.createSpyObj('BalanceService', [], {
      balance$: balanceSubject.asObservable(),
    });

    themeServiceSpy = jasmine.createSpyObj('ThemeService', ['toggleTheme']);

    languageServiceSpy = jasmine.createSpyObj('LanguageService', [
      'getCurrentLanguage',
      'setLanguage',
    ]);

    languageServiceSpy.getCurrentLanguage.and.returnValue('es');

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [HeaderComponent],
      providers: [
        { provide: BalanceService, useValue: balanceServiceSpy },
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: LanguageService, useValue: languageServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize current language', () => {
    expect(component.currentLanguage).toBe('es');
    expect(languageServiceSpy.getCurrentLanguage).toHaveBeenCalled();
  });

  it('should toggle theme', () => {
    component.toggleTheme();

    expect(themeServiceSpy.toggleTheme).toHaveBeenCalled();
  });

  it('should change language', () => {
    component.changeLanguage('en');

    expect(languageServiceSpy.setLanguage).toHaveBeenCalledWith('en');
    expect(component.currentLanguage).toBe('en');
  });

  it('should toggle language from es to en', () => {
    component.currentLanguage = 'es';

    component.toggleLanguage();

    expect(languageServiceSpy.setLanguage).toHaveBeenCalledWith('en');
    expect(component.currentLanguage).toBe('en');
  });

  it('should toggle language from en to es', () => {
    component.currentLanguage = 'en';

    component.toggleLanguage();

    expect(languageServiceSpy.setLanguage).toHaveBeenCalledWith('es');
    expect(component.currentLanguage).toBe('es');
  });
});
