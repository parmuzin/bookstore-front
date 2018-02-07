import {NgModule} from '@angular/core';
import {BookComponent} from './book/book.component';
import {BookService} from './book/book.service';
import {CommonModule} from '@angular/common';
import { BookViewComponent } from './book/book-view.component';
import {JhiDataUtils} from '../utility/data-util.service';
import {RouterModule} from '@angular/router';
import {Order} from './order/order.repository';
import { OrderComponent } from './order/order.component';
import {OrderService} from './order/order.service';
import { OrderSummaryComponent } from './order/order-summary.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [BookComponent, BookViewComponent, OrderComponent, OrderSummaryComponent],
  providers: [BookService, JhiDataUtils, Order, OrderService],
  exports: [BookComponent, OrderComponent, OrderSummaryComponent]
})
export class StoreModule {}
