import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { FooterComponent } from './components/footer/footer.component';

import { NgIconsModule } from '@ng-icons/core';
import { heroMoon, heroSun } from '@ng-icons/heroicons/outline';

@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmModalComponent,
    ToastComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    NgIconsModule.withIcons({
      heroMoon,
      heroSun,
    }),
  ],
  exports: [
    HeaderComponent,
    ConfirmModalComponent,
    ToastComponent,
    FooterComponent,
    NgIconsModule,
  ],
})
export class SharedModule {}
