import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {



  formUsuario!: FormGroup;
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {

    this.createForm(new User());

  }

  createForm(Usuario: User) {
    this.formUsuario = new FormGroup({
      email: new FormControl(Usuario.email),
      password: new FormControl(Usuario.password),


    })

  }

  onSubmit() {
    if (this.formUsuario.value.email == "teste@gmail.com.br" && this.formUsuario.value.password == "123456#$%") {


      this.formUsuario.reset();      
      this.router.navigate(['/dash']);



    }

  }
}

