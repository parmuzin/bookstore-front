import { Component, OnInit } from '@angular/core';
import {User} from '../../account/user/user.model';
import {UserService} from '../../account/user/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styles: []
})
export class UserTableComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  loadUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error)
    );
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.users.splice(
        this.users.findIndex(
          b => b.userId === userId), 1);
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

}
