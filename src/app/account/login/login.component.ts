import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  password: string;
  username: string;

  constructor(private router: Router,
              private loginService: LoginService) { }

  login(form: NgForm) {
    if (form.valid) {
      this.loginService.login(this.username, this.password)
        .subscribe(response => {
          if (response) {
            this.router.navigateByUrl('/');
          }
          this.errorMessage = 'Authentication Failed';
        });
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }

  register() {
    this.router.navigate(['/register']);
  }

  ngOnInit() {
  }
}
