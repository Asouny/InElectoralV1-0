import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule, validateEventsArray } from '@angular/fire/firestore'
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  usuario: User;
  json: any;
  parametro: any;
  users: User[] = new Array();
  idk: string;
  submitted = false;
  ids: User;

  constructor(private service: UserService,
    private db: AngularFirestore, private actroute: ActivatedRoute, private router: Router,
    private auser: AngularFireAuth) {


    this.getUsers();
    this.validateUser();
    this.rot();
  }


  async rot(){
    this.actroute.params.subscribe(
      params =>  {
        this.ids =  JSON.parse(params.special);
        console.log("IDS: "+this.ids)
        console.log(JSON.stringify(params.special));
      }
    );
  }


  ngOnInit() {
   this.getUsers();
   this.rot();
   console.log("IDS2: "+this.ids)
  }

  async getUsers() {
    const snapshotChanges = this.service.getSnapshotChanges();
    snapshotChanges.subscribe(resultQueryUsers => {
      resultQueryUsers.forEach(data => {
        this.users.push({
          id: data.payload.doc.id,
          email: data.payload.doc.get('email'),
          password: data.payload.doc.get('password'),
          photo: data.payload.doc.get('photo'),
          firstname: data.payload.doc.get('firstname'),
          lastname: data.payload.doc.get('lastname'),
          date: data.payload.doc.get('date'),
          curp: data.payload.doc.get('curp'),
          clvElectoral: data.payload.doc.get('clvElectoral'),
          voto: data.payload.doc.get('voto')
        });
      });
    });
    console.log(this.users);
  }

  async validateUser() {
    this.auser.authState.subscribe(user => {
      if (user) {
        this.idk = user.uid,
          this.json = user.toJSON();
        this.submitted = true;

        console.log('entre al validador');

        for (let i = 0; i <= this.users.length; i++) {
          console.log('estoy buscando: ');
          console.log(this.idk + ' el idk esta listo.');

          if (this.users[i].id === user.uid) {
            console.log('encontre el usuario')
            this.usuario = {
              id: this.users[i].id,
              email: this.users[i].email,
              password: this.users[i].password,
              photo: this.users[i].photo,
              firstname: this.users[i].firstname,
              lastname: this.users[i].lastname,
              date: this.users[i].date,
              curp: this.users[i].curp,
              clvElectoral: this.users[i].clvElectoral,
              voto: this.users[i].voto
            };
            console.log((this.usuario.firstname) + ' RECUPERACION(?)')
            break;
          }
        }


      }
    });







  }














}
