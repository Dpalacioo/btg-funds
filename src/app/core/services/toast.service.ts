import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  toast$ = this.toastSubject.asObservable();

  private timeoutId?: ReturnType<typeof setTimeout>;

  constructor(private translate: TranslateService) {}

  show(message: ToastMessage) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    const translatedText = this.translate.instant(message.text);

    this.toastSubject.next({
      ...message,
      text: translatedText,
    });

    this.timeoutId = setTimeout(() => {
      this.toastSubject.next(null);
    }, 3000);
  }
}
