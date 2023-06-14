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
  password = new FormControl('', [Validators.minLength(6)]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Поле обязательно';
    }

    if (this.password.hasError('minlength')) {
      return 'Введите не менее 6 символов';
    }

    return this.email.hasError('email') ? 'Некорректный email' : '';
  }

  constructor(private afAuth: AngularFireAuth) {
    this.login('root@gmail.com', '123qwe').then((r) => console.log(r));
  }
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
}
