import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from 'src/app/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private firestore: AngularFirestore) { }

  getSnapshotChanges() {
    return this.firestore.collection('contact').snapshotChanges();
  }
  createContact(contact: Contact) {
    return this.firestore.collection('contact').add(contact);
  }
}
