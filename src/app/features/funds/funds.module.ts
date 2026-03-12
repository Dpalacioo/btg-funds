import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundsPageComponent } from './pages/funds-page/funds-page.component';
import { FundCardComponent } from './components/fund-card/fund-card.component';
import { UserFundsPageComponent } from './pages/user-funds-page/user-funds-page.component';



@NgModule({
  declarations: [
    FundsPageComponent,
    FundCardComponent,
    UserFundsPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FundsModule { }
