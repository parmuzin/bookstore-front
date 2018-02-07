import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';
import {Http, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LoginService {

  private authenticationState = new Subject<any>();

  constructor(private http: HttpClient, private jwtHelper: JwtHelper) {
  }

  login(username: string, password: string): Observable<boolean> {

    const data = {
      userName: username,
      userPassword: password
    };

    return this.http
      .post(SERVER_API_URL + 'login', data, {observe: 'response'})
      .map(resp => {
        const bearerToken = resp.headers.get('Authorization');
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const auth_token = bearerToken.slice(7, bearerToken.length);
          localStorage.setItem('authenticationToken', auth_token);
          this.authenticationState.next();
          return true;
        }
        return false;
      });
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

  public getToken(): string {
    return localStorage.getItem('authenticationToken');
  }

  get authenticated(): boolean {
    // return this.datasource.auth_token != null;
    const token = this.getToken();
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;  }

  clear() {
    localStorage.removeItem('authenticationToken');
    this.authenticationState.next();
  }

  // getCurrentUser() {
  //     return this.datasource.sendRequest(RequestMethod.Get, 'getcurrentuser', null, true);
  // }
  // getCurrentUser() {
  //   return this.datasource.currentUser;
  // }
}
