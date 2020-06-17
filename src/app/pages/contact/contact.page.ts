import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  public myForm: FormGroup;
  public contact: Contact;
  constructor(private router: Router, private contactService: ContactService, private fb: FormBuilder) { }


  ngOnInit() {
    this.myForm = this.fb.group({
      firstname: ['', [Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])]],
      lastname: ['', [Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(150)])]],
      email: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      affair: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],

    });
  }

  clear() {
    this.myForm.setValue(
      { affair: '', email: '', firstname: '', lastname: '', message: '', phone: '' });
    this.myForm.reset({affair: '', email: '', firstname: '', lastname: '', message: '', phone: ''})
  }

  create() {
    this.contact = {
      email: this.myForm.controls.email.value,
      phone: this.myForm.controls.phone.value,
      firstname: this.myForm.controls.firstname.value,
      lastname: this.myForm.controls.lastname.value,
      message: this.myForm.controls.message.value,
      affair: this.myForm.controls.affair.value,
    };
    this.contactService.createContact(this.contact);
    window.confirm('Enviamos la aclaracion con exito sera redirigido a la pagina principal')
    this.router.navigate(['login']);
    this.clear();
  }

}
