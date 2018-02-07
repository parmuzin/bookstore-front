import {Component, OnInit} from '@angular/core';
import {Order} from '../../store/order/order.repository';
import {OrderService} from '../../store/order/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
})
export class OrderTableComponent implements OnInit {

  private orders: Order[] = [];
  includeCompleted = false;

  constructor(private orderService: OrderService,
              private router: Router) {
  }

  loadOrders() {
    return this.orderService.getOrders().subscribe(
      data => this.orders = data,
      error => console.log(error)
    );
  }

  getOrders(): Order[] {
    return this.orders
      .filter(order => this.includeCompleted || !order.orderStatus);
  }

// .filter(o => this.includeShipped || !o.orderStatus)
  completeOrder(order: Order) {
    order.orderStatus = true;
    this.orderService.updateOrder(order).subscribe(() => {
    });
  }

  deleteOrder(orderId: number) {
    this.orderService.deleteOrder(orderId).subscribe(() => {
      this.orders.splice(
        this.orders.findIndex(o => o.orderId === orderId), 1);
    });
  }

  onSelect(userName: string) {
    this.router.navigateByUrl(`/admin/main/users/${userName}`);
  }

  ngOnInit() {
    this.loadOrders();
  }

}
