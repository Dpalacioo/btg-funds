import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FundsPageComponent } from './pages/funds-page/funds-page.component';
import { FundCardComponent } from './components/fund-card/fund-card.component';



@NgModule({
  declarations: [
    FundsPageComponent,
    FundCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FundsModule { }
