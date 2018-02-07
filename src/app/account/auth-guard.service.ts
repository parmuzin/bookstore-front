import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LoginService} from './login/login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private loginService: LoginService,
              private  router: Router) {
  }

  canActivate(): boolean {
    if (!this.loginService.authenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
