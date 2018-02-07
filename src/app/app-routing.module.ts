import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {RegisterComponent} from './account/register/register.component';
import {LoginComponent} from './account/login/login.component';
import {BookComponent} from './store/book/book.component';
import {BookViewComponent} from './store/book/book-view.component';
import {OrderComponent} from './store/order/order.component';
import {UserComponent} from './account/user/user.component';
import {AuthGuardService} from './account/auth-guard.service';
import {ErrorComponent} from './layouts/error/error.component';
import {RoleGuardService} from './account/role-guard.service';

const appRoutes: Routes = [
  {path: '', redirectTo: 'store', pathMatch: 'full'},
  {path: 'store', component: BookComponent, pathMatch: 'full'},
  {path: 'book/:id', component: BookViewComponent, pathMatch: 'full'},
  {path: 'order', component: OrderComponent, pathMatch: 'full', canActivate: [AuthGuardService]},
  {
    path: 'user', component: UserComponent, canActivate: [AuthGuardService]
    // children: [
    //   {path: 'order', component: BookComponent, pathMatch: 'full'},
    //   {path: '', component: UserComponent}
    // ]
  },
  {path: '', component: NavbarComponent, outlet: 'navbar'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [RoleGuardService],
    data: {
      expectedRole: 'ROLE_ADMIN'
    }
  },
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: 'store'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
