import { Component, OnInit } from '@angular/core';
import { FundsService } from '../../../../core/services/funds.service';
import { Fund } from '../../../../core/models/fund';

@Component({
  selector: 'app-funds-page',
  templateUrl: './funds-page.component.html',
  styleUrls: ['./funds-page.component.scss'],
})
export class FundsPageComponent implements OnInit {
  funds: Fund[] = [];

  constructor(private fundsService: FundsService) {}

  ngOnInit(): void {
    this.loadFunds();
  }

  loadFunds() {
    this.fundsService.getFunds().subscribe({
      next: (data) => {
        this.funds = data;
      },
      error: (err) => {
        console.error('Error loading funds', err);
      },
    });
  }
}
