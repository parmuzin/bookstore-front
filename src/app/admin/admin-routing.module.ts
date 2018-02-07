import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../account/login/login.component';
import {BookTableComponent} from './book/book-table.component';
import {AdminComponent} from './admin.component';
import {BookEditorComponent} from './book/book-editor.component';
import {BookDetailComponent} from './book/book-detail.component';
import {OrderTableComponent} from './order/order-table.component';
import {UserDetailComponent} from './user/user-detail.component';
import {RoleGuardService} from '../account/role-guard.service';
import {UserTableComponent} from './user/user-table.component';
import {UserEditorComponent} from './user/user-editor.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [RoleGuardService],
    data: {
      expectedRole: 'ROLE_ADMIN'
    },
    children: [
      {path: 'books', component: BookTableComponent, pathMatch: 'full'},
      {path: 'orders', component: OrderTableComponent, pathMatch: 'full'},
      {path: 'users', component: UserTableComponent, pathMatch: 'full'},
      {path: 'books/:mode/:id', component: BookEditorComponent, pathMatch: 'full'},
      {path: 'books/:mode', component: BookEditorComponent, pathMatch: 'full'},
      {path: 'book/:id', component: BookDetailComponent, pathMatch: 'full'},
      {path: 'users/:mode/:id', component: UserEditorComponent, pathMatch: 'full'},
      {path: 'users/:mode', component: UserEditorComponent, pathMatch: 'full'},
      {path: 'user/:id', component: UserDetailComponent, pathMatch: 'full'},
      // { path: 'books', component: BookTableComponent },
      // { path: 'users/:userName', component: UserDetailComponent },
      // {
      //   path: 'orders',
      //   component: OrderTableComponent,
      //   canActivate: [UserRouteAccessService],
      //   data: {
      //     expectedRole: 'ROLE_ADMIN'
      //   }
      // },
      {path: '**', redirectTo: 'login'}
    ]
  }
  // { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
