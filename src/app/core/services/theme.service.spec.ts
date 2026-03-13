import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let html: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(ThemeService);

    html = document.documentElement;

    html.classList.remove('dark');

    localStorage.clear();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should enable dark mode when toggled', () => {
    service.toggleTheme();

    expect(html.classList.contains('dark')).toBeTrue();
    expect(localStorage.getItem('btg-theme')).toBe('dark');
  });

  it('should disable dark mode when toggled again', () => {
    html.classList.add('dark');

    service.toggleTheme();

    expect(html.classList.contains('dark')).toBeFalse();
    expect(localStorage.getItem('btg-theme')).toBe('light');
  });

  it('should load dark theme from localStorage', () => {
    localStorage.setItem('btg-theme', 'dark');

    service.loadTheme();

    expect(html.classList.contains('dark')).toBeTrue();
  });
});
