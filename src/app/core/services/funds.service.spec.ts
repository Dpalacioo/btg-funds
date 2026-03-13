import { TestBed } from '@angular/core/testing';
import { FundsService } from './funds.service';
import { Fund } from '../models/fund';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('FundsService', () => {
  let service: FundsService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/funds`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(FundsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch funds from API', () => {
    const mockFunds: Fund[] = [
      {
        id: 1,
        name: 'FPV_BTG_PACTUAL_RECAUDADORA',
        minAmount: 75000,
        category: 'FPV',
      },
    ];

    service.getFunds().subscribe((funds) => {
      expect(funds.length).toBe(1);
      expect(funds).toEqual(mockFunds);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockFunds);
  });

  it('should subscribe to a fund', (done) => {
    const fund: Fund = {
      id: 1,
      name: 'FPV_BTG_PACTUAL_RECAUDADORA',
      minAmount: 75000,
      category: 'FPV',
    };

    service.subscribeToFund(fund);

    service.userFunds$.subscribe((funds) => {
      expect(funds.length).toBe(1);
      expect(funds[0].id).toBe(1);
      done();
    });
  });

  it('should cancel a fund', (done) => {
    const fund: Fund = {
      id: 1,
      name: 'FPV_BTG_PACTUAL_RECAUDADORA',
      minAmount: 75000,
      category: 'FPV',
    };

    service.subscribeToFund(fund);

    service.cancelFund(1);

    service.userFunds$.subscribe((funds) => {
      expect(funds.length).toBe(0);
      done();
    });
  });
});
