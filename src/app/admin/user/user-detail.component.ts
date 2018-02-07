import {Component, OnInit} from '@angular/core';
import {UserService} from '../../account/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../account/user/user.model';
import {Order} from '../../store/order/order.repository';
import {OrderService} from '../../store/order/order.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent implements OnInit {

  user: User = new User();
  orders: Order[] = [];
  showOrders: boolean;
  updated: boolean;
  includeCompleted = false;

  constructor(private userService: UserService,
              private orderService: OrderService,
              private route: ActivatedRoute) {
  }

  load(userId: number) {
    this.userService.getUser(userId)
      .subscribe(data => this.user = data, error => console.log(error));
  }

  loadOrders(userName: string) {
    if (this.showOrders) {
      this.showOrders = false;
    } else {
      if (this.orders.length) {
        this.showOrders = true;
        return;
      }
      this.orderService.getOrdersByUser(userName)
        .subscribe(
          data => {
            this.orders = data;
            this.showOrders = true;
          },
          error => console.log(error)
        );
    }
  }

  getOrders(): Order[] {
    if (!this.orders.length) {
      this.loadOrders(this.user.userName);
    }
    return this.orders
      .filter(order => this.includeCompleted || !order.orderStatus);
  }

  update() {
    this.userService.updateUser(this.user)
      .subscribe(() => this.updated = true);
  }

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

  goBack(): void {
    window.history.back();
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.load(params['id']));
  }
}
