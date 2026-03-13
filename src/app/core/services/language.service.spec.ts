import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { TranslateService } from '@ngx-translate/core';

describe('LanguageService', () => {
  let service: LanguageService;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    localStorage.clear();

    translateServiceSpy = jasmine.createSpyObj('TranslateService', [
      'addLangs',
      'setFallbackLang',
      'use',
      'getCurrentLang',
    ]);

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslateService, useValue: translateServiceSpy },
      ],
    });

    service = TestBed.inject(LanguageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize language with default when nothing in localStorage', () => {
    expect(translateServiceSpy.addLangs).toHaveBeenCalledWith(['es', 'en']);
    expect(translateServiceSpy.setFallbackLang).toHaveBeenCalledWith('es');
    expect(translateServiceSpy.use).toHaveBeenCalledWith('es');
  });

  it('should initialize language with saved language', () => {
    localStorage.setItem('app-language', 'en');

    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslateService, useValue: translateServiceSpy },
      ],
    });

    const newService = TestBed.inject(LanguageService);

    expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
    expect(newService).toBeTruthy();
  });

  it('should set language', () => {
    service.setLanguage('en');

    expect(translateServiceSpy.use).toHaveBeenCalledWith('en');
    expect(localStorage.getItem('app-language')).toBe('en');
  });

  it('should return current language when available', () => {
    translateServiceSpy.getCurrentLang.and.returnValue('en');

    const lang = service.getCurrentLanguage();

    expect(lang).toBe('en');
  });

  it('should return default language when current language is null', () => {
    translateServiceSpy.getCurrentLang.and.returnValue(null as any);

    const lang = service.getCurrentLanguage();

    expect(lang).toBe('es');
  });

  it('should return default language when current language is undefined', () => {
    translateServiceSpy.getCurrentLang.and.returnValue(undefined as any);

    const lang = service.getCurrentLanguage();

    expect(lang).toBe('es');
  });
});
