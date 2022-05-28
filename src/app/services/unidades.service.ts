import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUnidade } from '../models/unidade.models';
import { Observable } from 'rxjs/internal/Observable';
import { api_Registro, api_unidades } from '../Constants/Urls';
import { Registro } from '../models/RegistroProd';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   }),
// };


@Injectable({
  providedIn: 'root'
})


export class UnidadesService {
 
  idEdit: number =0;


  constructor(private http: HttpClient) {  }

  setIdEdit(id: number) {
    this.idEdit = id;
    console.log("set edit"+this.idEdit);
  }

  getIdEdit() {
    return this.idEdit;
    console.log("get edit"+this.idEdit);
  }

 
  GetUnidades(): Observable<IUnidade[]> {
    return this.http.get<IUnidade[]>(api_unidades);
  }

 
  PegarPeloId(Id: number): Observable<IUnidade> {
    Id = this.idEdit;
    const apiUrl = `${api_unidades}/${Id}`;
    return this.http.get<IUnidade>(apiUrl);
  }


  PutUnidades(unidadeId: number, unit: IUnidade): Observable<any> {
    const apiUrl = `${api_unidades}/${unidadeId}`;
    return this.http.put<number>(apiUrl, unit);

  }

  ExcluirUnidade(unidadeId: number): Observable<any> {
    const apiUrl = `${api_unidades}/${unidadeId}`;
    return this.http.delete<number>(apiUrl);
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
