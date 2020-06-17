import { Injectable } from '@angular/core';
import { User } from '../../../models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterService } from '../../router/router.service';
import { UtilsService } from '../../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUserService {

  email: string;

  constructor(private firestore: AngularFirestore,
              private auth: AngularFireAuth,
              private router: RouterService,
              private util: UtilsService) { }

  getUser() {
    return this.auth;
  }

  getFirestore() {
    return this.firestore;
  }

  currentUser() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigateTo('tabs');
      }
    });
  }

  exist() {
    return this.firestore.collection('users');
  }

  createAccount(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  saveUser(user: User) {
    return this.firestore.collection('users').add(user);
  }

  signOut() {
    return this.auth.signOut();
  }
}
