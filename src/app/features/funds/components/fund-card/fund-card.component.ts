import { Component, Input } from '@angular/core';
import { Fund } from '../../../../core/models/fund';

@Component({
  selector: 'app-fund-card',
  templateUrl: './fund-card.component.html',
  styleUrls: ['./fund-card.component.scss'],
})
export class FundCardComponent {
  @Input() fund!: Fund;
}
