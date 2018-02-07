import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LoginService} from '../account/login/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService);
    if (loginService.authenticated) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${loginService.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
