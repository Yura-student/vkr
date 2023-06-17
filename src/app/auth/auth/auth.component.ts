import { Component, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  userForm!: FormGroup;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    // this.login('root@gmail.com', '123qwe').then((r) => console.log(r));
  }

  login() {
    if (this.userForm.valid) {
      this.fireAuth
        .signInWithEmailAndPassword(
          this.userForm.value.email,
          this.userForm.value.password
        )
        .then(() => {
          this.router.navigate(['resources']);
        })
        .catch((e) => {
          alert('Не удалось войти! Попробуйте снова');
        });
    }
  }

  //выход
  logout() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/users']);
    });
  }
}
