import {NgModule} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {RegisterService} from './register/register.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {LoginService} from './login/login.service';
import {JwtHelper} from 'angular2-jwt';
import {RouterModule} from '@angular/router';
import {UserService} from './user/user.service';
import {UserComponent} from './user/user.component';
import {AuthGuardService} from './auth-guard.service';
import {RoleGuardService} from './role-guard.service';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [RegisterComponent, LoginComponent, UserComponent],
  providers: [RegisterService, LoginService, JwtHelper, UserService, AuthGuardService, RoleGuardService],
  exports: [RegisterComponent, LoginComponent, UserComponent]
})
export class AccountModule {
}
