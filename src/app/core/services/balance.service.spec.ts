import { TestBed } from '@angular/core/testing';
import { BalanceService } from './balance.service';

describe('BalanceService', () => {
  let service: BalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return the initial balance', () => {
    const balance = service.getBalance();
    expect(balance).toBe(500000);
  });

  it('should update the balance correctly', () => {
    service.updateBalance(300000);
    const balance = service.getBalance();
    expect(balance).toBe(300000);
  });

  it('should emit new balance through balance$', (done) => {
    service.updateBalance(200000);

    service.balance$.subscribe((balance) => {
      expect(balance).toBe(200000);
      done();
    });
  });
});
