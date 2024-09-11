import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ContactService } from '../../../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  contacts: any[] = [];
  isEditing = false;
  editIndex: number | null = null;
  username: string | null = null;
  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 
    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private contactService: ContactService,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    if (this.username) {
      this.getContacts();
    } else {
      alert('User not logged in.');
    }
  }

  getContacts(): void {
    this.contacts = this.contactService.getContacts(this.username);
  }

  onSubmit(): void {
    if (this.contactForm.valid && this.username) {
      const newContact = { 
        ...this.contactForm.value,
        id: this.generateId(), // Generate a unique ID
        username: this.username
      };

      if (this.isEditing && this.editIndex !== null) {
        // Update contact
        const updatedContact = { ...newContact, id: this.contacts[this.editIndex].id }; // Preserve original ID
        this.contactService.updateContact(this.editIndex, updatedContact);
      } else {
        // Create new contact
        this.contactService.createContact(newContact);
      }
      this.getContacts(); // Refresh contacts list
      this.resetForm(); // Reset form after submission
    }
  }

  generateId(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit ID
  }

  editContact(index: number): void {
    this.isEditing = true;
    this.editIndex = index;
    this.contactForm.patchValue(this.contacts[index]);
  }

  updateContact(): void {
    if (this.editIndex !== null) {
      const updatedContact = { 
        ...this.contactForm.value,
        id: this.contacts[this.editIndex].id, // Preserve original ID
        username: this.username 
      };
      this.contactService.updateContact(this.editIndex, updatedContact);
      this.getContacts(); // Refresh contacts list
      this.resetForm(); // Reset form after update
    }
  }

  deleteContact(index: number): void {
    if (this.username === 'Khushi' || this.contacts[index].username === this.username) {
      this.contactService.deleteContact(index);
      this.getContacts(); // Refresh contacts list
      this.resetForm(); // Reset form after deletion
    } else {
      alert('You are not authorized to delete this contact.');
    }
  }
  resetForm(): void {
    this.contactForm.reset();
    this.isEditing = false;
    this.editIndex = null;
  }
  redirectToPersonalForm(): void {
    this.router.navigate(['/admin/personal-form']);
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
