import { Component, OnInit } from '@angular/core';
import {RegisterService} from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  confirmPassword: string;
  doNotMatch: string;
  error: string;
  errorUserExists: string;
  registerAccount: any;
  success: boolean;

  constructor(private registerService: RegisterService) {}

  ngOnInit() {
    this.success = false;
    this.registerAccount = {};
  }

  register() {
    if (this.registerAccount.userPassword !== this.confirmPassword) {
      this.doNotMatch = 'ERROR';
    } else {
      this.doNotMatch = null;
      this.error = null;
      this.errorUserExists = null;
      this.registerService.save(this.registerAccount).subscribe(() => {
        this.success = true;
      }, (response) => this.processError(response));
    }
  }

  private processError(response) {
    this.success = null;
    if (response.status === 400 && response.error === 'usernameExists') {
      this.errorUserExists = 'ERROR';
    } else {
      this.error = 'ERROR';
    }
  }
}
