import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
import {Order} from './order.repository';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OrderService {

  private resourceUrl = SERVER_API_URL + 'orders';

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.resourceUrl);
  }

  getOrdersByUser(userName: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${SERVER_API_URL}users/orders`, {
      params: new HttpParams().set('userName', userName)
    });
  }

  getOrdersByCurrentUser(): Observable<Order[]> {
    return this.http.get<Order[]>(`${SERVER_API_URL}user/orders`);
  }

  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.resourceUrl}/${orderId}`);
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.resourceUrl, order);
  }

  updateOrder(order: Order): any {
    return this.http.put(this.resourceUrl, order);
  }

  deleteOrder(orderId: number): any {
    return this.http.delete(`${this.resourceUrl}/${orderId}`);
  }
}
