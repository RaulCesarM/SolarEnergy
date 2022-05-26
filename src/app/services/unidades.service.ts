import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUnidade } from '../models/unidade.models';
import { Observable } from 'rxjs/internal/Observable';
import { api_Registro, api_unidades } from '../Constants/Urls';
import { Registro } from '../models/RegistroProd';




@Injectable({
  providedIn: 'root'
})


export class UnidadesService {
 

  constructor(private http: HttpClient) {  }
 
  GetUnidades(): Observable<IUnidade[]> {
    return this.http.get<IUnidade[]>(api_unidades);
  }

  GetRegistros():Observable<Registro> {
    return this.http.get<Registro>(api_Registro);
  }


  PostProducao(URL: string, prod: Registro){
    this.http.post<Registro>(URL,prod).subscribe();   

  } 

  PutProducao(URL: string, prod: Registro) {
    this.http.put<Registro>(URL,prod).subscribe();    

  }

 





}
