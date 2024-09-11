import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private username: string | null = null;
  private userId: string | null = null; // Store userId
 


  constructor(private http: HttpClient, private router: Router) {
 
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>('http://localhost:3000/api/auth/login', { username, password })
    .pipe(
        tap((response: any) => {
          this.token = response.token ? String(response.token) : '';
          this.username = response.username ? String(response.username) : '';

          localStorage.setItem('token', this.token);
          localStorage.setItem('username', username);  
          console.log('Login Successful - Token:', this.token); // Debugging

        })
      );
  }

  signup(userData: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/signup', userData);
  }


  logout(): void {
    this.token = null;
    this.username = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  
  getUserId(): string | null {  // Add getUserId method
    return localStorage.getItem('userId');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
  
}