import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalService } from '../../../../services/personal.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  personalForm!: FormGroup;
  selectedFile: File | null = null;
  serverResponse: any;
  storedDetails: any;
  username: string | null = '';

  constructor(
    private fb: FormBuilder,
    private personalService: PersonalService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.personalForm = this.fb.group({
      hobby: ['', Validators.required],
      occupation: ['', Validators.required],
      placesVisited: ['', Validators.required],
      favoriteArtist: ['', Validators.required],
      musician: ['', Validators.required],
      dob: ['', Validators.required],
      file: [null]
    });

    this.storedDetails = this.personalService.getPersonalDetails();
    if (this.storedDetails) {
      this.personalForm.patchValue(this.storedDetails);
    }

    this.username = this.authService.getUsername();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  onSubmit(): void {
    if (this.personalForm.valid) {
      const formData = new FormData();
      formData.append('hobby', this.personalForm.get('hobby')?.value);
      formData.append('occupation', this.personalForm.get('occupation')?.value);
      formData.append('placesVisited', this.personalForm.get('placesVisited')?.value);
      formData.append('favoriteArtist', this.personalForm.get('favoriteArtist')?.value);
      formData.append('musician', this.personalForm.get('musician')?.value);
      formData.append('dob', this.personalForm.get('dob')?.value);

      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }

      if (this.username) {
        formData.append('username', this.username);
      }

      this.personalService.submitPersonalDetails(formData).subscribe(response => {
        this.serverResponse = response;
        console.log('Form submitted successfully');

        const formDataWithUsername = { ...this.personalForm.value, username: this.username };
        this.personalService.storePersonalDetails(formDataWithUsername);
        this.personalForm.reset();
        this.selectedFile = null; 
      }, error => {
        console.error('Form submission error', error);
      });
    }
  }
}
