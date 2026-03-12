import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [HeaderComponent, ConfirmModalComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, ConfirmModalComponent],
})
export class SharedModule {}
