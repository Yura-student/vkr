import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number) {
    return this.http.get(`${this.baseUrl}?page=${page}`);
  }

  getUserDetails(userId: number) {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  updateUserDetails(userId: number, updatedUserData: User) {
    return this.http.put(`${this.baseUrl}/${userId}`, updatedUserData);
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }
}
