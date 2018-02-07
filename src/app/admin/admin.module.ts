import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BookTableComponent } from './book/book-table.component';
import { AdminComponent } from './admin.component';
import {AccountModule} from '../account/account.module';
import { BookEditorComponent } from './book/book-editor.component';
import {FormsModule} from '@angular/forms';
import {JhiDataUtils} from '../utility/data-util.service';
import { BookDetailComponent } from './book/book-detail.component';
import { OrderTableComponent } from './order/order-table.component';
import { UserDetailComponent } from './user/user-detail.component';
import { UserTableComponent } from './user/user-table.component';
import { UserEditorComponent } from './user/user-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    AccountModule,
  ],
  declarations: [BookTableComponent, AdminComponent, BookEditorComponent, BookDetailComponent, OrderTableComponent, UserDetailComponent, UserTableComponent, UserEditorComponent],
  providers: [JhiDataUtils]
})
export class AdminModule { }
