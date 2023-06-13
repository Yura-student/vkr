import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ResourceApiService {
  baseUrl = 'https://reqres.in/api/unknown';

  constructor(private http: HttpClient) {}

  getResources() {
    return this.http.get(this.baseUrl);
  }
}
