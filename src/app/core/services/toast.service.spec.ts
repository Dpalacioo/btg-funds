import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastService, ToastMessage } from './toast.service';
import { TranslateService } from '@ngx-translate/core';

describe('ToastService', () => {
  let service: ToastService;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant']);

    TestBed.configureTestingModule({
      providers: [
        ToastService,
        { provide: TranslateService, useValue: translateServiceSpy },
      ],
    });

    service = TestBed.inject(ToastService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should show translated toast message', (done) => {
    const message: ToastMessage = {
      text: 'toast.subscriptionSuccess',
      type: 'success',
    };

    translateServiceSpy.instant.and.returnValue('Subscription successful');

    service.show(message);

    service.toast$.subscribe((toast) => {
      if (toast) {
        expect(translateServiceSpy.instant).toHaveBeenCalledWith(
          'toast.subscriptionSuccess',
        );

        expect(toast.text).toBe('Subscription successful');
        expect(toast.type).toBe('success');

        done();
      }
    });
  });

  it('should clear previous timeout when show is called twice', fakeAsync(() => {
    const message: ToastMessage = {
      text: 'toast.subscriptionSuccess',
      type: 'success',
    };

    translateServiceSpy.instant.and.returnValue('Subscription successful');

    const clearSpy = spyOn(globalThis, 'clearTimeout');

    service.show(message);
    service.show(message);

    expect(clearSpy).toHaveBeenCalled();

    tick(3000);
  }));

  it('should clear toast after timeout', fakeAsync(() => {
    const message: ToastMessage = {
      text: 'toast.subscriptionSuccess',
      type: 'success',
    };

    translateServiceSpy.instant.and.returnValue('Subscription successful');

    service.show(message);

    let lastToast: ToastMessage | null = null;

    service.toast$.subscribe((t) => (lastToast = t));

    tick(3000);

    expect(lastToast).toBeNull();
  }));
});
