import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceApiService } from '../resource-api.service';

const RATING_SCALES = {
  'Professional training': 10,
  'Submission of rationalization proposals': 10,
  'Participation in the public life of the organization': 10,
  'Supervisory replacement experience': 10,
  'Appreciation from the leader': 10,
  'Experience in implementing new projects in the enterprise': 10,
  'Knowledge and application of specific skills': 10,
  'Compliance with the service goals of projects': 10,
};

const WEIGHT_COEFFICIENTS = {
  'Professional training': 10,
  'Submission of rationalization proposals': 10,
  'Participation in the public life of the organization': 5,
  'Supervisory replacement experience': 30,
  'Appreciation from the leader': 5,
  'Experience in implementing new projects in the enterprise': 20,
  'Knowledge and application of specific skills': 15,
  'Compliance with the service goals of projects': 5,
};

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss'],
})
export class ResourceDetailsComponent {
  userId?: string | null;

  userForm!: FormGroup;
  constructor(
    private resourceApiService: ResourceApiService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.userForm = this.formBuilder.group({
      rate1: ['', Validators.required],
      rate2: ['', Validators.required],
      rate3: ['', Validators.required],
      rate4: ['', Validators.required],
      rate5: ['', Validators.required],
      rate6: ['', Validators.required],
      rate7: ['', Validators.required],
      rate8: ['', Validators.required],

      achievements: ['', Validators.required],
      name: ['', Validators.required],
    });
    if (this.userId) {
      this.userForm.patchValue({
        ...this.resourceApiService.users.find(
          (user) => user.id === this.userId
        ),
      });
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      const rate = this.calculateOverallRating();
      if (this.userId == 'add') {
        this.resourceApiService.users.push({
          id: this.resourceApiService.users.length,
          ...this.userForm.value,
          rate,
        });
      } else {
        this.resourceApiService.users = this.resourceApiService.users.map(
          (item) =>
            item.id == this.userId
              ? { ...item, ...this.userForm.value, rate }
              : item
        );
      }
      this.router.navigate(['/resources/']);
    }
  }

  calculateOverallRating(): number {
    const ratings = [
      this.userForm.value.rate1,
      this.userForm.value.rate2,
      this.userForm.value.rate3,
      this.userForm.value.rate4,
      this.userForm.value.rate5,
      this.userForm.value.rate6,
      this.userForm.value.rate7,
      this.userForm.value.rate8,
    ];
    let overallRating = 0;
    const weightCoefficients = Object.values(WEIGHT_COEFFICIENTS);
    const ratingScales = Object.values(RATING_SCALES);
    ratings.forEach((rating, index) => {
      const weightCoefficient = weightCoefficients[index];
      const weightedScore = +rating * weightCoefficient;

      overallRating += weightedScore;
    });

    overallRating /= 100;

    return overallRating;
  }
}
