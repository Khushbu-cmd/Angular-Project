import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private apiUrl = 'http://localhost:3000/api/personal-details';

  constructor(private http: HttpClient) { }

  submitPersonalDetails(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  fetchPersonalDetailsByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?username=${username}`);
  }

  storePersonalDetails(details: any): void {
    localStorage.setItem('personalDetails', JSON.stringify(details));
  }

  getPersonalDetails(): any {
    const details = localStorage.getItem('personalDetails');
    return details ? JSON.parse(details) : null;
  }
}
