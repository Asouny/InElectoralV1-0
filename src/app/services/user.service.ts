import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { AngularFireAuth } from '@angular/fire/auth';

import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLogged: any = false;

  constructor(public auser: AngularFireAuth, private firestore: AngularFirestore,private afs: AngularFirestore,private afsAuth: AngularFireAuth) { 
    this.auser.authState.subscribe(user => (this.isLogged = user));
  }
  
  getSnapshotChanges() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }
  

  createUser(user: User) {
    return this.firestore.collection('usuarios').add(user);
  }

  async singInEmail(emal:string,pass:string){
    return await this.auser.signInWithEmailAndPassword(emal,pass)
    .catch(function(error){
      console.log(error)
    })
  }
  
  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

}
