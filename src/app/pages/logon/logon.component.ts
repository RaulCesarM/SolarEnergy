import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {

  user: IUser = {
    username: '',
    password: ''
  };





  constructor() { }

  ngOnInit(): void {
  }

  login(){
    console.log("Login");
  }

}
