import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cookieConsent: boolean = false;
  showBanner: boolean = true;
  randomCookieValue: string = '';

  constructor(private router: Router, private translate: TranslateService, private cookieService: CookieService) {
 
  }
  
  ngOnInit(): void {
    const consent = this.cookieService.get('cookieConsent');
    if (consent === 'accepted') {
      this.cookieConsent = true;
      this.showBanner = false;
      this.randomCookieValue = this.cookieService.get('randomCookie');
    } else if (consent === 'declined') {
      this.cookieConsent = false;
      this.showBanner = false;
    }
   

    this.router.navigate(['/dashboard']);
  }

  generateRandomCookie(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  // Function to handle acceptance of cookies
  acceptCookies(): void {
    this.randomCookieValue = this.generateRandomCookie();
    this.cookieService.set('randomCookie', this.randomCookieValue, 7); // Set random cookie for 7 days
    this.cookieService.set('cookieConsent', 'accepted', 365); // Store consent for 1 year
    this.cookieConsent = true;
    this.showBanner = false;
  }

  // Function to handle decline of cookies
  declineCookies(): void {
    this.cookieService.set('cookieConsent', 'declined', 365); // Store decline for 1 year
    this.cookieConsent = false;
    this.showBanner = false;
  }
}
