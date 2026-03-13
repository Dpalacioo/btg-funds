import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { FundsPageComponent } from './funds-page.component';
import { FundsService } from '../../../../core/services/funds.service';
import { Fund } from '../../../../core/models/fund';
import { TranslateModule } from '@ngx-translate/core';

describe('FundsPageComponent', () => {
  let component: FundsPageComponent;
  let fixture: ComponentFixture<FundsPageComponent>;
  let fundsServiceSpy: jasmine.SpyObj<FundsService>;

  const mockFunds: Fund[] = [
    {
      id: 1,
      name: 'FPV_BTG_PACTUAL_RECAUDADORA',
      minAmount: 75000,
      category: 'FPV',
    } as Fund,
    {
      id: 2,
      name: 'FIC_ACCIONES_GLOBAL',
      minAmount: 125000,
      category: 'FIC',
    } as Fund,
  ];

  beforeEach(async () => {
    fundsServiceSpy = jasmine.createSpyObj('FundsService', ['getFunds']);

    await TestBed.configureTestingModule({
      declarations: [FundsPageComponent],
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: FundsService, useValue: fundsServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FundsPageComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadFunds on ngOnInit', () => {
    const spy = spyOn(component, 'loadFunds');

    fixture.detectChanges(); // ejecuta ngOnInit

    expect(spy).toHaveBeenCalled();
  });

  it('should call FundsService.getFunds()', () => {
    fundsServiceSpy.getFunds.and.returnValue(of(mockFunds));

    component.loadFunds();

    expect(fundsServiceSpy.getFunds).toHaveBeenCalled();
  });

  it('should load funds successfully', () => {
    fundsServiceSpy.getFunds.and.returnValue(of(mockFunds));

    component.loadFunds();

    expect(component.funds.length).toBe(2);
    expect(component.funds).toEqual(mockFunds);
  });

  it('should handle error when loading funds', () => {
    const consoleSpy = spyOn(console, 'error');

    fundsServiceSpy.getFunds.and.returnValue(
      throwError(() => new Error('Error loading funds')),
    );

    component.loadFunds();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error loading funds',
      jasmine.any(Error),
    );
  });
});
