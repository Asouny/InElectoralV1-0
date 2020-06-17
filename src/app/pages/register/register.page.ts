import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public myForm: FormGroup;
  public user: User;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  urlImage2: Observable<string>;
  urlImage3: Observable<string>;
  @ViewChild('imageUser') inputImageUser: ElementRef;
  @ViewChild('imageine1') inputImageine1: ElementRef;
  @ViewChild('imageine2') inputImageine2: ElementRef;


  constructor(private router: Router, private userService: UserService, private fb: FormBuilder,private firestore: AngularFirestore,
    public auser: AngularFireAuth, private storage: AngularFireStorage, storagea :AngularFireStorage, storageb :AngularFireStorage) { }

    
  ngOnInit() {
    this.myForm = this.fb.group({
      firstname: ['', [Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])]],
      lastname: ['', [Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])]],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      photo: ['', Validators.compose([Validators.required])],
      photo2: ['', Validators.compose([Validators.required])],
      photo3: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
      curp: ['', Validators.compose([Validators.required, Validators.pattern('[A-Z]{4}[0-9]{6}[H,M][A-Z]{5}[0-9]{2}')])],
      clvElectoral: ['', Validators.compose([Validators.required])],
    });
  }

  clear() {
    this.myForm.setValue(
      { password: '', email: '', firstname: '', lastname: '', photo: '', date: '', curp: '', clvElectoral: '' });
    this.myForm.reset({ password: '', email: '', firstname: '', lastname: '', photo: '', date: '', curp: '', clvElectoral: '' })
  }

  create() {
    this.user = {
      email: this.myForm.controls.email.value,
      password: this.myForm.controls.password.value,
      photo: this.myForm.controls.photo.value,
      firstname: this.myForm.controls.firstname.value,
      lastname: this.myForm.controls.lastname.value,
      date: this.myForm.controls.date.value,
      curp: this.myForm.controls.curp.value,
      clvElectoral: this.myForm.controls.clvElectoral.value,
      voto: false
    };
    this.userService.createUser(this.user);
    this.router.navigate(['login'])
    window.confirm('Usuario registrado exitosamente, favor de iniciar sesion');
    this.clear();
  }

  createUser(){
    this.auser.createUserWithEmailAndPassword(this.myForm.controls.email.value, this.myForm.controls.password.value).then(cred => {
      return this.firestore.collection('usuarios').doc(cred.user.uid).set({
        email: this.myForm.controls.email.value,
        password: this.myForm.controls.password.value,
        photo: this.inputImageUser.nativeElement.value,
        photo2: this.inputImageine1.nativeElement.value,
        photo3: this.inputImageine2.nativeElement.value,
        firstname: this.myForm.controls.firstname.value,
        lastname: this.myForm.controls.lastname.value,
        date: this.myForm.controls.date.value,
        curp: this.myForm.controls.curp.value,
        clvElectoral: this.myForm.controls.clvElectoral.value,
        voto: false        
      })
   })
}


onUpload(e){
  //console.log('subir: ', e);
  const id = Math.random().toString(36).substring(2);
  const file = e.target.files[0];
  const filePath =  `uploads/profile_${id}`;
  const ref = this.storage.ref(filePath);
  const task = this.storage.upload(filePath,file);
  this.uploadPercent = task.percentageChanges();
  task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  console.log(e);
}

onUpload2(e){
  //console.log('subir: ', e);
  const id = Math.random().toString(36).substring(2);
  const file = e.target.files[0];
  const filePath =  `uploads/profile_${id}`;
  const ref = this.storage.ref(filePath);
  const task = this.storage.upload(filePath,file);
  this.uploadPercent = task.percentageChanges();
  task.snapshotChanges().pipe(finalize(() => this.urlImage2 = ref.getDownloadURL())).subscribe();
  console.log(e);
}

onUpload3(e){
  //console.log('subir: ', e);
  const id = Math.random().toString(36).substring(2);
  const file = e.target.files[0];
  const filePath =  `uploads/profile_${id}`;
  const ref = this.storage.ref(filePath);
  const task = this.storage.upload(filePath,file);
  this.uploadPercent = task.percentageChanges();
  task.snapshotChanges().pipe(finalize(() => this.urlImage3 = ref.getDownloadURL())).subscribe();
  console.log(e);
}

}
