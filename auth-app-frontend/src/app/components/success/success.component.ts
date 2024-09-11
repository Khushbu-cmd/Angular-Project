import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../../../../services/personal.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  username: string | null = '';
  personalDetails: any[] = []; // Initialize as an empty array

  constructor(
    private personalService: PersonalService,
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    if (this.username) {
      this.loadPersonalDetails();
    } else {
      console.error('User not logged in.');
    }
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  loadPersonalDetails(): void {
    if (this.username) {
      this.personalService.fetchPersonalDetailsByUsername(this.username).subscribe(
        (data) => {
          this.personalDetails = data;
          console.log('Fetched personal details:', this.personalDetails); // Check data here
        },
        (error) => {
          console.error('Error fetching personal details', error);
        }
      );
    }
  }
}
