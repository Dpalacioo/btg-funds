import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import {
  ToastService,
  ToastMessage,
} from '../../../core/services/toast.service';
import { BehaviorSubject, take } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastSubject: BehaviorSubject<ToastMessage | null>;
  let toastServiceMock: Partial<ToastService>;

  beforeEach(async () => {
    toastSubject = new BehaviorSubject<ToastMessage | null>(null);

    toastServiceMock = {
      toast$: toastSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: ToastService, useValue: toastServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose toast$ observable from ToastService', () => {
    expect(component.toast$).toBeDefined();
  });

  it('should receive toast message from the service', (done) => {
    const mockToast: ToastMessage = {
      text: 'Test toast',
      type: 'success',
    };

    component.toast$.subscribe((toast) => {
      if (toast) {
        expect(toast).toEqual(mockToast);
        done();
      }
    });

    toastSubject.next(mockToast);
  });

  it('should emit null when there is no toast', () => {
    component.toast$
      .pipe(take(1))
      .subscribe((toast) => {
        expect(toast).toBeNull();
      });

    toastSubject.next(null);
  });
});
