import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FundsPageComponent } from './features/funds/pages/funds-page/funds-page.component';
import { TransactionsPageComponent } from './features/transactions/pages/transactions-page/transactions-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'funds', pathMatch: 'full' },

  { path: 'funds', component: FundsPageComponent },

  { path: 'transactions', component: TransactionsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
