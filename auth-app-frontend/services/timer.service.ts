import { Injectable } from '@angular/core';
import { interval, Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private counter: number = 0;
  private counterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.counter);
  private timerSubscription: Subscription | null = null;

  // Start the timer and emit updates
  startTimer(): void {
    if (!this.timerSubscription) {
      this.timerSubscription = interval(1000).subscribe(() => {
        this.counter++;
        this.counterSubject.next(this.counter);  // Emit the new counter value
      });
    }
  }

  // Stop the timer
  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  // Reset the timer
  resetTimer(): void {
    this.counter = 0;
    this.counterSubject.next(this.counter);  // Emit the reset value
  }

  // Get the current counter as an observable
  getCounterObservable() {
    return this.counterSubject.asObservable();
  }
}
