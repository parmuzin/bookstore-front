import { Component, OnInit } from '@angular/core';
import {Order} from './order.repository';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private order: Order) { }

  ngOnInit() {
  }

}
