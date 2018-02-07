import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from './user.model';
import {SERVER_API_URL} from '../../app.constants';

@Injectable()
export class UserService {

  private resourceUrl = SERVER_API_URL + 'users';

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(SERVER_API_URL + 'user');
  }

  updateUser(user: User): Observable<String> {
    return this.http.put<String>(this.resourceUrl, user);
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.resourceUrl}/${userId}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.resourceUrl);
  }

  addUser(user: User): any {
    return this.http.post(this.resourceUrl, user);
  }

  deleteUser(userId: number): any {
    return this.http.delete(`${this.resourceUrl}/${userId}`);
  }
}
