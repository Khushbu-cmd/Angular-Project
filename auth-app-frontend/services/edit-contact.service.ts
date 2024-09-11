import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private storageKey = 'contacts';

  constructor() {}

  // Save contact data to local storage
  saveContact(contact: any): void {
    const contacts = this.getContacts();
    contacts.push(contact);
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  // Get all contacts from local storage
  getContacts(): any[] {
    const contacts = localStorage.getItem(this.storageKey);
    return contacts ? JSON.parse(contacts) : [];
  }

  // Delete a contact
  deleteContact(index: number): void {
    const contacts = this.getContacts();
    contacts.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  // Update a contact
  updateContact(index: number, updatedContact: any): void {
    const contacts = this.getContacts();
    contacts[index] = updatedContact;
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }
}
