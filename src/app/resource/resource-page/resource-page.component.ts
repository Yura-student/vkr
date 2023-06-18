import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource-page',
  templateUrl: './resource-page.component.html',
  styleUrls: ['./resource-page.component.scss'],
})
export class ResourcePageComponent {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}
  //выход
  logout() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  add() {
    this.router.navigate(['/resources/add']);
  }

  cancel() {
    this.router.navigate(['/resources']);
  }

  isAddPage(): boolean {
    return this.router.url === '/resources/add';
  }
}
