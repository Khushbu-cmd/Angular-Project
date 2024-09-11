import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';  // Adjust the path based on your project structure
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('rotateIn', [
      transition(':enter', [
        animate('800ms ease-in', keyframes([
          style({ transform: 'rotate(0deg)', opacity: 0, offset: 0 }), // Initial state: not rotated, hidden
          style({ transform: 'rotate(90deg)', opacity: 0.5, offset: 0.5 }), // Midway: half rotated, semi-visible
          style({ transform: 'rotate(360deg)', opacity: 1, offset: 1.0 }) // Final state: full rotation, fully visible
        ]))
      ])
    ])
  ]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService) {
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang(savedLanguage);
    this.translate.use(savedLanguage);
  }
  faLock = faLock;
  switchLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('language', lang); // Save language preference
  }

  // This method will handle the form submission
  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(() => {
      this.router.navigate(['/dashboard']);  // Navigate to the dashboard after login
    }, error => {
      console.error('Login failed', error);
      alert("Login Credential doesn't match")
    });
  }
}
