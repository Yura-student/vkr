import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ResourceApiService {
  baseUrl =
    'https://career-manager-974b7-default-rtdb.asia-southeast1.firebasedatabase.app/';

  constructor(private http: HttpClient) {}

  getResources() {
    return this.http.get(this.baseUrl, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
