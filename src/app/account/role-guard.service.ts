import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from './login/login.service';
import decode from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivateChild, CanLoad {

  constructor(private loginService: LoginService,
              private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('CAN ACTIVATE CHILD');
    return this.checkLogin(route.parent);
  }

  canLoad(route: Route): boolean {
    console.log('CAN LOAD');
    return this.checkLogin(route);
  }

  checkLogin(route: Route | ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;


    if (!this.loginService.authenticated) {
      this.router.navigate(['login']);
      return false;
    }

    const token = localStorage.getItem('authenticationToken');
    const tokenPayload = decode(token);

    if (tokenPayload.auth !== expectedRole) {
      this.router.navigate(['error']);
      return false;
    }
    return true;
  }

}
