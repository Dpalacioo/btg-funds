import { Component } from '@angular/core';
import {
  ToastService,
  ToastMessage,
} from '../../../core/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  toast$: Observable<ToastMessage | null>;

  constructor(private toastService: ToastService) {
    this.toast$ = this.toastService.toast$;
  }
}
