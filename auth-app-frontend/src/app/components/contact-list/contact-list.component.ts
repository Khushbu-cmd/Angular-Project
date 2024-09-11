import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../../services/edit-contact.service';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];
  contactForm: any = {
    id: '',
    username: '',
    contactNumber: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  };
  isEditing = false;
  editingIndex: number | null = null;

  constructor(private contactService: ContactService,     private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load contacts on component initialization
    this.contacts = this.contactService.getContacts();
  }

  // Submit form to add or update contact
  onSubmit(): void {
    if (this.isEditing && this.editingIndex !== null) {
      // Update the contact if editing
      this.contactService.updateContact(this.editingIndex, this.contactForm);
    } else {
      // Add a new contact
      this.contactService.saveContact(this.contactForm);
    }

    // Reload contacts after saving
    this.contacts = this.contactService.getContacts();

    // Reset form after submission
    this.resetForm();
  }

 

  // Delete contact
  deleteContact(index: number): void {
    this.contactService.deleteContact(index);
    this.contacts = this.contactService.getContacts(); // Reload contacts
  }

 // Edit contact
editContact(index: number): void {
  this.isEditing = true;
  this.editingIndex = index;
  this.contactForm = { ...this.contacts[index] };
}


logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}
// Reset form and exit edit mode
resetForm(): void {
  this.isEditing = false;
  this.editingIndex = null;
  this.contactForm = {
    id: '',
    username: '',
    contactNumber: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  };
}

  
}
