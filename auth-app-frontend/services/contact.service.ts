import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private storageKey = 'contacts';

  constructor() {}

  saveContacts(contacts: { 
    id: string; // Added ID
    contactNumber: string;
    address: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    username: string;
  }[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  getContacts(username: string | null): { 
    id: string; // Added ID
    contactNumber: string;
    address: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    username: string;
  }[] {
    const allContacts = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    if (username) {
      return allContacts.filter((contact: any) => contact.username === username);
    }
    return [];
  }

  createContact(contact: { 
    id: string; // Added ID
    contactNumber: string;
    address: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    username: string;
  }): void {
    const contacts = this.getAllContacts();
    contacts.push(contact);
    this.saveContacts(contacts);
  }

  updateContact(index: number, updatedContact: { 
    id: string; // Added ID
    contactNumber: string;
    address: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    username: string;
  }): void {
    const contacts = this.getAllContacts();
    if (index >= 0 && index < contacts.length) {
      contacts[index] = updatedContact;
      this.saveContacts(contacts);
    } else {
      console.error('Contact not found at index', index);
    }
  }

  deleteContact(index: number): void {
    const contacts = this.getAllContacts();
    if (index >= 0 && index < contacts.length) {
      contacts.splice(index, 1);
      this.saveContacts(contacts);
    } else {
      console.error('Contact not found at index', index);
    }
  }

  private getAllContacts(): any[] {
    const contacts = localStorage.getItem(this.storageKey);
    return contacts ? JSON.parse(contacts) : [];
  }
}
