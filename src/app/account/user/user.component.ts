import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {User} from './user.model';
import {Order} from '../../store/order/order.repository';
import {OrderService} from '../../store/order/order.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  user: User = new User();
  orders: Order[] = [];
  showOrders = false;
  updated = false;
  includeCompleted = false;

  constructor(private userService: UserService,
              private orderService: OrderService) {
  }

  loadUser() {
    this.userService.getCurrentUser().subscribe(data => this.user = data);
  }

  loadOrders() {
    if (this.showOrders) {
      this.showOrders = false;
    } else {
      this.orderService.getOrdersByCurrentUser()
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
      this.loadOrders();
    }
    return this.orders
      .filter(order => this.includeCompleted || !order.orderStatus);
  }

  update() {
    this.userService.updateUser(this.user)
      .subscribe(() => this.updated = true);
  }

  ngOnInit() {
    this.loadUser();
  }
}
