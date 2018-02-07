import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../account/login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  isAuthenticated(): Boolean {
    return this.loginService.authenticated;
  }

  logout() {
    this.loginService.clear();
    this.router.navigateByUrl('/');
  }

}
