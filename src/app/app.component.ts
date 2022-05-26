import {  Component, OnInit } from '@angular/core';

import { UnidadesService } from './services/unidades.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private buscar: UnidadesService
   ) {

  }
    

  ngOnInit() {
   

  }

}
  
