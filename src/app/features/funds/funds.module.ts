import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundsPageComponent } from './pages/funds-page/funds-page.component';
import { FundCardComponent } from './components/fund-card/fund-card.component';
import { UserFundsPageComponent } from './pages/user-funds-page/user-funds-page.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FundsPageComponent, FundCardComponent, UserFundsPageComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export class FundsModule {}
