import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}
  //выход

  login() {
    this.router.navigate(['auth']);
  }
}
