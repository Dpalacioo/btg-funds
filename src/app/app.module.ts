import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideHttpClient } from '@angular/common/http';

import { FundsModule } from './features/funds/funds.module';
import { SharedModule } from './shared/shared.module';
import { TransactionsModule } from './features/transactions/transactions.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FundsModule,
    SharedModule,
    TransactionsModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
