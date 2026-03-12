import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmModalComponent,
    ToastComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    ConfirmModalComponent,
    ToastComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
