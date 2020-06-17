import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

// tslint:disable-next-line: component-class-suffix
export class LoginPage implements OnInit {
  users: User[] = [];
  usuario: User;
  myForm: FormGroup;
  submitted = false;

  json: any;
  parametro: any;

  idk: string;

  ids: User;


  constructor(
    private router: Router, private fb: FormBuilder, private service: UserService, public alerta: AlertController, public auser: AngularFireAuth,
    private firestore: AngularFirestore) {
    this.getUsers();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }


  view(users) {
    this.submitted = true;
  }

  getUsers() {
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

  userFound(email: string, password: string): { bol: boolean, usuario?: User } {
    for (const u of this.users) {
      if (u.email === email && u.password === password) {
        return { bol: true, usuario: u };
      }
    }
    return { bol: false };
  }

  validateUser() {
    this.submitted = true;
    if (this.myForm.valid) {
      this.getUsers();
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].email === this.myForm.get('email').value) {
          if (this.users[i].password === this.myForm.get('password').value) {
            console.log(this.users[i] + 'USUARIO RECUPERADO');
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

            console.log(JSON.stringify(this.usuario) + 'RECUPERACION(?)')

            const extras: NavigationExtras = {
              queryParams: {
                special: JSON.stringify(this.usuario)
              }
            };
            this.router.navigate(['tabs'], extras);
            break;
          }
          window.confirm('Contraseña incorrecta favor de intentarlo nuevamente ')
        }
      }
    }
  }
  register() {
    this.router.navigate(['register']);
  }

  contact() {
    this.router.navigate(['contact']);
  }

  async Login() {
    const user = await this.service.singInEmail(
      this.myForm.get('email').value,
      this.myForm.get('password').value);

    if (user) {
      console.log(user.user.uid)
      this.router.navigate(['tabs']);
    }
    else {
      console.log();
    }
  }



  signIn() {
    if (this.myForm.valid) {
      this.users.forEach(user => {
        if (this.myForm.get('email').value === user.email && this.myForm.get('password').value === user.password) {
          this.accessToAccount(true, user);
        }
      });
    } else {
      this.accessToAccount(false, null);
    }
  }

  accessToAccount(access: boolean, user: User): void {
    if (access) {
      this.myForm.get('email').setValue('');
      this.myForm.get('password').setValue('');
      this.viewProfile(user);
    }
  }

  viewProfile(user: User) {
    const extras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(user)
      }
    };
    this.router.navigate(['tabs'], extras);
  }


}




