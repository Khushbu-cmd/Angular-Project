import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Add this
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ngfModule } from 'angular-file';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { AuthInterceptorService } from '../../services/auth-interceptor.service';
import { SuccessComponent } from './components/success/success.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ContactFormComponent,
    ContactListComponent,
    PersonalDetailsComponent,
    
    SuccessComponent
  
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule ,
    ReactiveFormsModule ,
    FontAwesomeModule,
    RouterModule,
    ngfModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
    ],
  providers: [CookieService, provideAnimationsAsync(), 
  
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}


