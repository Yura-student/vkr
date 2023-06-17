import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../user-api.service';
import { User } from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  userId!: number;

  userForm!: FormGroup;
  user!: User;
  first_name: any;

  constructor(
    private route: ActivatedRoute,
    private userApiService: UserApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userId = +(this.route.snapshot.paramMap.get('id') ?? 1);
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.userApiService.getUserDetails(this.userId).subscribe({
      next: (response: any) => {
        this.user = response.data;
        this.userForm.patchValue({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
        });
      },
      error: (err) => console.log(err),
    });
  }

  updateUser() {
    if (this.userForm.valid) {
      this.userApiService
        .updateUserDetails(this.userId, {
          ...this.user,
          ...this.userForm.value,
        })
        .subscribe({
          next: (response) => (this.user = response as User),
          error: (err) => console.log(err),
        });
    }
  }
}
