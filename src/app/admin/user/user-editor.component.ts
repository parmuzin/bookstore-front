import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../account/user/user.model';
import {UserService} from '../../account/user/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styles: []
})
export class UserEditorComponent implements OnInit {

  userMessage: string;
  editing = false;
  user: User = new User();

  constructor(private userService: UserService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  save() {
    if (this.user.userId == null || this.user.userId == 0) {
      this.userService.addUser(this.user).subscribe(() => this.userMessage = 'User added successfully');
    } else {
      this.userService.updateUser(this.user).subscribe(() => this.userMessage = 'User updated successfully');
    }
    this.router.navigateByUrl('/admin/users');
  }

  ngOnInit() {
    this.editing = this.activeRoute.snapshot.params['mode'] === 'edit';
    if (this.editing) {
      this.userService.getUser(this.activeRoute.snapshot.params['id']).subscribe(user => this.user = user);
    }
  }

}
