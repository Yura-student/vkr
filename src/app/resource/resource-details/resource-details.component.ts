import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceApiService } from '../resource-api.service';

const RATING_SCALES = {
  'Professional Skills and Knowledge': 10,
  'Productivity and Performance': 10,
  'Leadership Qualities and Communication': 10,
  'Adaptability and Problem-Solving': 10,
  'Desire for Development': 10,
};

const WEIGHT_COEFFICIENTS = {
  'Professional Skills and Knowledge': 30,
  'Productivity and Performance': 25,
  'Leadership Qualities and Communication': 20,
  'Adaptability and Problem-Solving': 15,
  'Desire for Development': 10,
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
