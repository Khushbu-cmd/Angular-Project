import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';  // Adjust path as needed
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { TimerService } from '../../../../services/timer.service';  // Adjust path as needed
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  username: string | null = '';
  counter: number = 0;
  private timerSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    
    // Start the timer
    this.timerService.startTimer();

    // Subscribe to the timer's counter observable to get updates
    this.timerSubscription = this.timerService.getCounterObservable().subscribe(counterValue => {
      this.counter = counterValue;
    });
  }

  ngOnDestroy(): void {
    // Clean up the timer subscription when the component is destroyed
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.timerService.stopTimer();  // Optionally stop the timer on logout
    this.router.navigate(['/login']);
  }

  redirectToContactForm(): void {
    this.router.navigate(['/contact-form']);
  }

  redirectToPersonalForm(): void {
    this.router.navigate(['/personal-details']);
  }

  // Actions for Khushi (edit buttons)
  editContact(): void {
    this.router.navigate(['/contact-list']);  // Adjust the route as needed
  }

  editPersonalDetails(): void {
    this.router.navigate(['/success']);  // Adjust the route as needed
  }
}
