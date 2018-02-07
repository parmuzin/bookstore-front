import { Component, OnInit } from '@angular/core';
import {OrderService} from './order.service';
import {Order} from './order.repository';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  orderSent = false;

  constructor(public orderService: OrderService,
              public order: Order) { }
  submitOrder() {
    this.orderService.saveOrder(this.order).subscribe(() => {
      this.order.clear();
      this.orderSent = true;
    });
  }

  ngOnInit() {
  }

}
