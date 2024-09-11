import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditPersonalDetailsService {
  private apiUrl = 'http://localhost:3000/api/personal-details'; // Your API base URL

  constructor(private http: HttpClient) { }

  getPersonalDetails(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
}
