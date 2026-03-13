import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TransactionsPageComponent],
  imports: [CommonModule, RouterModule, TranslateModule],
})
export class TransactionsModule {}
