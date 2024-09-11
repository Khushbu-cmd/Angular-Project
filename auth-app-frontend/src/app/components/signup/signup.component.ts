import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';  // Adjust the path based on your project structure
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SignupComponent {
  userData = {
    username: '',
    password: ''
  };
  alertMessage: string = '';
  alertType: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.signup(this.userData).subscribe(
      (response: any) => {
        this.alertMessage = response.message;
        this.alertType = 'success'; // Or use 'danger' for errors
        setTimeout(() => this.router.navigate(['/login']), 2000);  // Redirect after 2 seconds
      },
      error => {
       alert("Enter valid username or password");
      }
    );
  }
}
