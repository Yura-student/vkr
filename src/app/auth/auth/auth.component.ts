import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Поле обязательно';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private afAuth: AngularFireAuth) {
    this.login('root@gmail.com', '123qwe').then((r) => console.log(r));
  }
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
}
